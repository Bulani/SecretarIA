import { GoogleGenAI } from '@google/genai';

import { allFunctions as calendarFunctions } from './tools/calendar.js';
import { allFunctions as emailFunctions } from './tools/email.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const allFunctions = calendarFunctions.concat(emailFunctions);

const contents = [
  {
    role: "user",
    parts: [{ text: "mande um email para pix@jvfm.com.br, com o valor a ser cobrado para o pix 10 reais" }]
  }
];

var response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: contents,
  config: {
    tools: [
      {
        functionDeclarations: allFunctions
      }
    ]
  }
});

console.log(response.candidates[0].content.parts[0]);