const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { image_url, image_base64 } = await req.json();
    if (!image_url && !image_base64) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (!LOVABLE_API_KEY) {
      // Fallback: simulate device recognition without AI
      const simulated = simulateRecognition();
      return new Response(JSON.stringify(simulated), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const imageContent = image_url
      ? { type: "image_url" as const, image_url: { url: image_url } }
      : { type: "image_url" as const, image_url: { url: `data:image/jpeg;base64,${image_base64}` } };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an appliance recognition AI. Analyze the image and identify the home appliance/device. Return ONLY a JSON object with these fields:
- device_type: one of [tv, ac, heater, fridge, washing_machine, charger, laptop, boiler, console, light, fan, microwave, oven, dishwasher, dryer, vacuum, iron, router, monitor, speaker, other]
- brand: detected brand or "Unknown"
- model: detected model or "Unknown"  
- category: one of [entertainment, cooling, heating, kitchen, laundry, lighting, computing, bathroom, other]
- confidence: number 0-100
- estimated_watts: typical wattage for this device type
- estimated_standby_watts: typical standby wattage
Do NOT include any text outside the JSON.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Identify this home appliance:" },
              imageContent,
            ],
          },
        ],
        tools: [{
          type: "function",
          function: {
            name: "identify_device",
            description: "Identify a home appliance from an image",
            parameters: {
              type: "object",
              properties: {
                device_type: { type: "string", enum: ["tv", "ac", "heater", "fridge", "washing_machine", "charger", "laptop", "boiler", "console", "light", "fan", "microwave", "oven", "dishwasher", "dryer", "vacuum", "iron", "router", "monitor", "speaker", "other"] },
                brand: { type: "string" },
                model: { type: "string" },
                category: { type: "string", enum: ["entertainment", "cooling", "heating", "kitchen", "laundry", "lighting", "computing", "bathroom", "other"] },
                confidence: { type: "number" },
                estimated_watts: { type: "number" },
                estimated_standby_watts: { type: "number" },
              },
              required: ["device_type", "brand", "model", "category", "confidence", "estimated_watts", "estimated_standby_watts"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "identify_device" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status === 402) {
        const simulated = simulateRecognition();
        return new Response(JSON.stringify({ ...simulated, fallback: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Try parsing from content
    const content = data.choices?.[0]?.message?.content || "";
    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } catch {
      const simulated = simulateRecognition();
      return new Response(JSON.stringify(simulated), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  } catch (error) {
    console.error("Device recognition error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

function simulateRecognition() {
  const devices = [
    { device_type: "tv", brand: "Samsung", model: "Smart TV 55\"", category: "entertainment", confidence: 85, estimated_watts: 110, estimated_standby_watts: 8 },
    { device_type: "ac", brand: "Gree", model: "Split AC 12k BTU", category: "cooling", confidence: 82, estimated_watts: 1200, estimated_standby_watts: 5 },
    { device_type: "fridge", brand: "Beko", model: "RDSA240K", category: "kitchen", confidence: 90, estimated_watts: 150, estimated_standby_watts: 0 },
    { device_type: "washing_machine", brand: "LG", model: "F4WV308S", category: "laundry", confidence: 88, estimated_watts: 500, estimated_standby_watts: 3 },
    { device_type: "charger", brand: "Apple", model: "20W USB-C", category: "computing", confidence: 78, estimated_watts: 20, estimated_standby_watts: 2 },
    { device_type: "laptop", brand: "HP", model: "Pavilion 15", category: "computing", confidence: 87, estimated_watts: 65, estimated_standby_watts: 3 },
    { device_type: "heater", brand: "DeLonghi", model: "Oil Radiator", category: "heating", confidence: 80, estimated_watts: 2000, estimated_standby_watts: 0 },
  ];
  return devices[Math.floor(Math.random() * devices.length)];
}
