const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 second video on topic: Intersting historical story along with AI image prompt in realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling 16th-century Venetian marketplace, overflowing with colorful fabrics, spices, and exotic goods. Merchants in period clothing haggle with customers, a canal with gondolas visible in the background. Soft, golden sunlight bathes the scene. Realistic oil painting style.\",\n    \"ContentText\": \"For centuries, Venice was the queen of trade. It was a melting pot of cultures, where merchants from across the globe gathered to exchange their goods.\"\n  },\n    {\n    \"imagePrompt\": \"Close up of an old, worn and detailed map. A finger points to a specific location on the silk road. Some of the silk road can be seen in the background. Realistic aged parchment style with fine ink drawing.\",\n    \"ContentText\": \"Its strategic location along the Silk Road made it a vital hub connecting East and West.\"\n  },\n  {\n    \"imagePrompt\": \"A beautifully crafted, dark wooden chest with ornate metal detailing, open to reveal sparkling gemstones, rare coins, and intricate jewelry spilling out. Dramatic lighting highlights the richness of the treasures. Realistic photography.\",\n      \"ContentText\": \"Traders brought exotic spices, shimmering silks, and precious gems, filling the city's coffers and its streets with a vibrant energy.\"\n\n  },\n  {\n    \"imagePrompt\": \"A crowded Venetian canal at dusk. Gondolas drift silently along the dark water with elegant buildings on either side. Warm light spills from the windows.  Realistic digital painting style.\",\n    \"ContentText\": \"Venice became incredibly wealthy, its grand canals and lavish palazzos standing as testaments to its dominance.\"\n  },\n  {\n    \"imagePrompt\":\"An aging merchant with a weathered face, and a fine coat and hat, speaking directly to the viewer. Background shows a busy Venetian street. Realistic oil painting.\",\n    \"ContentText\":\"But amidst this wealth, a rumor began to spread about a secret society. One that held the key to controlling the spice trade, and thus, the entire Venetian economy.\"\n\n    },\n    {\n    \"imagePrompt\":\"A dimly lit, underground chamber with stone walls, A few figures in dark hooded robes are gathered around a table with a map and various documents spread out. Light from a single lantern casts long shadows. Realistic dark fantasy illustration\",\n    \"ContentText\": \"The story of the 'Spice Syndicate' as they were called became whispered among the merchants. But was it just a myth?\"\n\n    },\n {\n    \"imagePrompt\": \"A gondola, partially submerged, lies broken amongst rocks at the mouth of a canal. The surrounding water is choppy and disturbed. Realistic photography\",\n    \"ContentText\": \" Some say that the Syndicate's power grew, and then mysteriously vanished, leaving no trace. Except perhaps for a few sunken gondolas…\"\n  },\n  {\n    \"imagePrompt\": \" A modern-day tourist walks along a Venetian canal, looking at the buildings. Light and shadows create interesting patterns. Realistic photo of a real canal in venice\",\n        \"ContentText\":\"And this rich history of power and mystery still echoes in the beautiful canals of Venice today.\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  