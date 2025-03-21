
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

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
    const { dataSource, fields, prompt } = await req.json();

    // If no API key is set yet, return a helpful error message
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Gemini API key not configured",
          message: "Please set up your GEMINI_API_KEY in the Supabase dashboard"
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create prompt for chart suggestions
    const aiPrompt = `
      You are a data visualization expert.
      ${prompt ? `The user asks: "${prompt}"` : "Generate useful chart suggestions for data visualization."}
      
      Data source: ${dataSource}
      ${fields && fields.length > 0 ? `Available fields: ${fields.join(', ')}` : ''}
      
      Suggest 3 different chart types that would be useful for this data. For each chart, provide:
      1. A title
      2. A brief description
      3. The recommended chart type (choose from: bar, line, pie, area, scatter, donut)
      4. The recommended field to use for x-axis or category dimension
      5. The recommended field(s) to use for measures
      
      Also include a brief explanation of why these suggestions would be valuable.
      
      Return your response as a JSON object with two keys:
      - "charts": an array of chart configurations with title, description, type, x, and measures
      - "explanation": a string explaining the rationale for these suggestions
    `;

    // Call the Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: aiPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    
    let result;
    try {
      // Try to parse the response as JSON first
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON object from the text - sometimes the AI includes markdown code formatting
      const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                         generatedText.match(/```\n([\s\S]*?)\n```/) ||
                         generatedText.match(/({[\s\S]*})/);
                         
      const jsonString = jsonMatch ? jsonMatch[1] : generatedText;
      result = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      
      // Fallback to default suggestions
      result = {
        charts: [
          {
            title: "Data Distribution",
            description: "Shows the distribution of values in your dataset",
            type: "bar",
            x: "category",
            measures: ["value"]
          },
          {
            title: "Time Series Analysis",
            description: "Visualizes data changes over time",
            type: "line",
            x: "date",
            measures: ["value"]
          },
          {
            title: "Proportion Breakdown",
            description: "Shows the relative proportions of categories",
            type: "pie",
            x: "category",
            y: "value"
          }
        ],
        explanation: "These are default chart suggestions. For more relevant charts, please provide specific information about your data."
      };
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in generate-chart-suggestions function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
