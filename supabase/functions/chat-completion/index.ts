
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
    
    // Enhanced system message with more detailed context and better instructions
    let systemContent = 'You are a personalized educational assistant that provides accurate, relevant information about programming courses.';
    
    if (context) {
      systemContent += '\n\nCurrent context:';
      if (context.title) systemContent += `\n- Course: ${context.title}`;
      if (context.description) systemContent += `\n- About: ${context.description}`;
      if (context.currentSection) {
        systemContent += `\n- Active section: ${context.currentSection}`;
        
        // Enhanced section-specific instructions
        switch(context.currentSection) {
          case "overview":
            systemContent += '\n\nProvide a helpful overview of key concepts, learning objectives, and relevance to the programming field.';
            break;
          case "learning":
            systemContent += '\n\nOffer guidance on the learning path, suggest resources, and explain how concepts build upon each other.';
            break;
          case "practice":
            systemContent += '\n\nHelp with practice questions and provide hints rather than direct answers. Explain programming concepts when needed.';
            break;
          case "coding":
            systemContent += '\n\nAssist with coding challenges by providing guidance on algorithms, debugging strategies, and best practices.';
            break;
          default:
            systemContent += '\n\nProvide educational assistance related to programming concepts and learning.';
        }
      }
      
      systemContent += '\n\nGuidelines for your responses:';
      systemContent += '\n- Be concise but thorough - aim for clarity first';
      systemContent += '\n- Use examples to illustrate complex concepts';
      systemContent += '\n- When explaining code, focus on the underlying principles';
      systemContent += '\n- Maintain a friendly, encouraging tone';
      systemContent += '\n- If you\'re unsure about something, acknowledge it instead of guessing';
    }

    // Format the history for Gemini with improved conversation tracking
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Enhanced prompt with better conversation context
    const geminiPrompt = [
      { role: 'user', parts: [{ text: systemContent }] },
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    console.log('Sending enhanced request to Gemini API');

    // Enhanced API request with improved parameters for better text generation
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiPrompt,
        generationConfig: {
          temperature: 0.6, // Slightly lower temperature for more focused responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000, // Increased max tokens for more detailed responses
          responseMimeType: "text/plain",
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      // Enhanced error detection and user-friendly messages
      if (errorData.error?.message?.includes('quota') || 
          errorData.error?.message?.includes('billing') || 
          errorData.error?.message?.includes('limit') ||
          errorData.error?.status === 'RESOURCE_EXHAUSTED') {
        return new Response(
          JSON.stringify({ 
            error: `API quota exceeded: ${errorData.error?.message}`,
            message: 'I apologize, but our AI service is temporarily unavailable due to high demand. The team has been notified and is working to restore service promptly.' 
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

    // Post-process the response to improve formatting
    const processedMessage = assistantMessage
      // Ensure code blocks have proper spacing
      .replace(/```(\w+)\n/g, '```$1\n')
      .replace(/\n```/g, '\n\n```')
      // Ensure list items are properly spaced
      .replace(/\n-/g, '\n\n-')
      // Format headings properly
      .replace(/\n(#+)([^#\n])/g, '\n\n$1$2');

    // Calculate token usage (Gemini doesn't provide this directly, so we'll estimate)
    const usage = {
      prompt_tokens: Math.ceil(JSON.stringify(geminiPrompt).length / 4), // Rough estimate
      completion_tokens: Math.ceil(processedMessage.length / 4), // Rough estimate
      total_tokens: 0 // Will be calculated below
    };
    usage.total_tokens = usage.prompt_tokens + usage.completion_tokens;

    return new Response(
      JSON.stringify({ 
        message: processedMessage,
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
    
    // Enhanced error categorization and user-friendly messages
    const errorMessage = error.message || 'An error occurred while processing your request';
    const isQuotaError = errorMessage.includes('quota') || 
                         errorMessage.includes('billing') || 
                         errorMessage.includes('limit') ||
                         errorMessage.includes('RESOURCE_EXHAUSTED');
    const isConnectionError = errorMessage.includes('network') || 
                             errorMessage.includes('timeout') || 
                             errorMessage.includes('connection');
    
    const userFriendlyMessage = isQuotaError
      ? 'I apologize, but our AI service is temporarily unavailable due to high demand. The team has been notified and is working to restore service promptly.'
      : isConnectionError
        ? 'I apologize, but there was an issue connecting to our AI service. Please check your connection and try again in a moment.'
        : 'I apologize, but I encountered an issue while processing your request. Please try again or contact support if the problem persists.';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        message: userFriendlyMessage,
        errorType: isQuotaError ? 'quota' : isConnectionError ? 'connection' : 'general'
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
