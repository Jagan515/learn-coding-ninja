
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { message, context, history = [] } = await req.json();
    
    console.log("Received request with message:", message);
    console.log("Context:", context);
    
    if (!message) {
      throw new Error("No message provided");
    }

    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    // Create a system message based on the course context
    const contextDescription = context 
      ? `You are a helpful assistant for the ${context.title} course. ${context.description || ''} ${context.currentSection ? `The user is currently in the ${context.currentSection} section.` : ''}`
      : "You are a helpful programming course assistant. Answer questions about programming, coding, and learning to code.";

    // Prepare messages for OpenAI, including context and history
    const messages = [
      { role: "system", content: contextDescription },
      ...history,
      { role: "user", content: message }
    ];

    // Make a request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error("No response generated from the assistant");
    }

    console.log("Generated response:", assistantResponse.substring(0, 50) + "...");

    // Return the assistant's response
    return new Response(
      JSON.stringify({ message: assistantResponse }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    );
  } catch (error) {
    console.error("Error in chat-completion function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred during the chat completion process"
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
