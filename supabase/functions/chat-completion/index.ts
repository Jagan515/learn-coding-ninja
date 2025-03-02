
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API key. Please set the OPENAI_API_KEY in your Supabase secrets.');
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

    // Prepare the messages array for OpenAI
    const messages = [
      { role: 'system', content: systemContent },
      ...history,
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with messages:', JSON.stringify(messages));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a cost-effective model
        messages: messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      // Check for quota exceeded errors
      if (errorData.error?.message?.includes('quota') || errorData.error?.message?.includes('billing')) {
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API error: ${errorData.error?.message}`,
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
      
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI:', JSON.stringify(data));

    if (!data.choices || data.choices.length === 0) {
      throw new Error('Invalid response from OpenAI API');
    }

    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        usage: data.usage
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
    const isQuotaError = errorMessage.includes('quota') || errorMessage.includes('billing');
    
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
