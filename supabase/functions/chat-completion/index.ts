
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!geminiApiKey) {
      throw new Error('Missing Gemini API key. Please set the GEMINI_API_KEY in your Supabase secrets.');
    }

    const { message, context, history = [] } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    console.log('Processing chat request with context:', JSON.stringify(context));
    
    // Construct the system message with course context
    let systemContent = 'You are a helpful course assistant that provides information about programming courses.';
    
    if (context) {
      systemContent += ' Here is information about the current course or context:';
      if (context.title) systemContent += `\nTitle: ${context.title}`;
      if (context.description) systemContent += `\nDescription: ${context.description}`;
      if (context.currentSection) systemContent += `\nCurrent Section: ${context.currentSection}`;
      
      systemContent += '\n\nProvide helpful, educational responses related to this context when possible.';
    }

    // Format the history for Gemini (converting from OpenAI format)
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Prepare the messages array for Gemini
    const geminiPrompt = [
      { role: 'user', parts: [{ text: systemContent }] },
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    console.log('Sending request to Gemini API');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiPrompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      // Check for quota exceeded errors
      if (errorData.error?.message?.includes('quota') || 
          errorData.error?.message?.includes('billing') || 
          errorData.error?.message?.includes('limit')) {
        return new Response(
          JSON.stringify({ 
            error: `Gemini API error: ${errorData.error?.message}`,
            message: 'I apologize, but our AI service is temporarily unavailable. The team has been notified and is working to restore service.' 
          }),
          { 
            status: 503, // Service Unavailable
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Retry-After': '3600' // Suggest retry after an hour
            } 
          }
        );
      }
      
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini:', JSON.stringify(data));

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Invalid response from Gemini API');
    }

    // Extract the assistant's message from Gemini response
    const assistantMessage = data.candidates[0].content.parts[0].text;

    // Calculate token usage (Gemini doesn't provide this directly, so we'll estimate)
    const usage = {
      prompt_tokens: Math.ceil(JSON.stringify(geminiPrompt).length / 4), // Rough estimate
      completion_tokens: Math.ceil(assistantMessage.length / 4), // Rough estimate
      total_tokens: 0 // Will be calculated below
    };
    usage.total_tokens = usage.prompt_tokens + usage.completion_tokens;

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        usage: usage
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in chat-completion function:', error);
    
    // Check if the error is quota-related
    const errorMessage = error.message || 'An error occurred while processing your request';
    const isQuotaError = errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('limit');
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        message: isQuotaError
          ? 'I apologize, but our AI service is temporarily unavailable. The team has been notified and is working to restore service.'
          : 'I apologize, but I encountered an error while trying to respond. Please try again or contact support if the issue persists.'
      }),
      { 
        status: isQuotaError ? 503 : 500, // Service Unavailable for quota errors
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
          ...(isQuotaError ? {'Retry-After': '3600'} : {}) // Suggest retry after an hour for quota errors
        } 
      }
    );
  }
});
