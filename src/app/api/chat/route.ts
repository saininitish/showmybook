import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client
// It will look for the GROQ_API_KEY environment variable
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
});

const SYSTEM_PROMPT = `
You are an AI assistant for ReelBook, a premium movie and event ticket booking platform (similar to BookMyShow).
Your job is to help users find movies, concerts, and events, and answer questions about the booking process.
Current available movies: Dune: Part Two, Oppenheimer, The Batman, Inception.
Current available events: Coldplay Concert, Standup Comedy Special.
Keep your answers concise, helpful, and friendly. If a user wants to book, tell them to navigate to the Movies or Events tab.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Groq API key not configured. I'm running in offline mode, but I'm here to help you book tickets on ReelBook!" },
        { status: 200 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 512,
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0]?.message?.content || "I couldn't process that request."
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
