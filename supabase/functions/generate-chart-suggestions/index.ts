
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';

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
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const { dataSource, fields, prompt } = await req.json();
    
    // Construct a more detailed prompt for the AI
    let aiPrompt = `You are an expert data visualization assistant. `;
    
    if (prompt) {
      aiPrompt += `The user is asking: "${prompt}". `;
    }
    
    aiPrompt += `Based on a dataset with the following fields: ${fields.join(', ')}, `;
    aiPrompt += `suggest appropriate chart visualizations that would best represent this data. `;
    aiPrompt += `For each chart suggestion, provide a title, description, chart type (choose from: bar, line, pie, area, scatter, donut, card), `;
    aiPrompt += `and which fields should be used for x-axis and measures.`;
    aiPrompt += `Return the response in JSON format with this structure: { "charts": [{"title": "", "description": "", "type": "", "x": "", "measures": [""]}], "explanation": "" }`;

    // Call Gemini AI API
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
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error('Failed to get suggestions from AI');
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract JSON from the response
    let result;
    try {
      // Look for JSON in the response text
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/);
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
      result = JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON from AI response:', e);
      // Fallback structure if parsing fails
      result = {
        charts: [
          {
            title: "Data Visualization",
            description: "Visualization of the dataset",
            type: "bar",
            x: fields[0] || "category",
            measures: [fields[1] || "value"]
          }
        ],
        explanation: "This is a basic visualization of your data."
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-chart-suggestions function:', error);
    
    return new Response(JSON.stringify({
      charts: [
        {
          title: "Bar Chart",
          description: "Standard bar chart for comparing values",
          type: "bar",
          x: "category",
          measures: ["value"]
        },
        {
          title: "Line Chart",
          description: "Time series visualization",
          type: "line",
          x: "date",
          measures: ["value"]
        },
        {
          title: "Pie Chart",
          description: "Distribution across categories",
          type: "pie",
          x: "category",
          measures: ["value"]
        }
      ],
      explanation: "These are default suggestions. For better suggestions, please try again."
    }), {
      status: error.message.includes('not configured') ? 500 : 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
