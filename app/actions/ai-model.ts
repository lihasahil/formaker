"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const tools = [
  {
    googleSearch: {},
  },
];

const config = {
  thinkingConfig: {
    thinkingBudget: -1,
  },
  tools,
};

export async function callGeminiAI(userInput: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    console.log("Calling Gemini API with input:", userInput);

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: userInput,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model: "gemini-flash-latest",
      config,
      contents,
    });

    let fullResponse = "";
    for await (const chunk of response) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }

    console.log("Gemini response received:", fullResponse);
    return fullResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(
      `Failed to generate form: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}