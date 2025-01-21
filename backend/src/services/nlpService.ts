import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
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
            text: `Extract form fields with labels and values in JSON format from this document: ${text}. Please output it in the following structure:\n\n{\n  "fields": [\n    {\n      "label": "Name",\n      "value": "John Doe"\n    },\n    {\n      "label": "Phone",\n      "value": "+1 (620) 130-7224"\n    }\n  ]\n}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Output the extracted form fields in a structured JSON format with dynamic labels and values, similar to the example provided.",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(text);
  const response = await result.response;

  // Clean up and parse the returned JSON string
  const cleanedData = response.text().replace(/```json|```/g, '').trim();
  const parsedData = JSON.parse(cleanedData); // Parse JSON string into an object

  return parsedData; // Return the parsed JSON object
}
