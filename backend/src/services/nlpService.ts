import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export async function nlpService(text: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Extract form fields with labels and values in JSON format from this document: ${text}. For any URLs found in the text (formatted as [URL: url]), create a separate "link" field with appropriate labels. Please output it in the following structure:

{
  "fields": [
    {
      "label": "Name",
      "value": "John Doe"
    },
    {
      "label": "Phone",
      "value": "+1 (620) 130-7224"
    },
    {
      "label": "LinkedIn Profile",
      "value": "John Doe",
      "link": "https://linkedin.com/in/johndoe"
    }
  ]
}

When processing links:
1. Create meaningful labels based on the context (e.g., "LinkedIn Profile", "Portfolio Website", "GitHub Profile")
2. Include both the display text and the URL
3. Group related information together (name with profile link, etc.)`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I'll extract the form fields and create structured JSON with appropriate labels for both regular fields and links, maintaining context and relationships between related information.",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(text);
  const response = await result.response;

  // Clean up and parse the returned JSON string
  const cleanedData = response.text().replace(/```json|```/g, '').trim();
  const parsedData = JSON.parse(cleanedData);

  return parsedData;
}