import OpenAI from "openai";

export const gptClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
