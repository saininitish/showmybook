import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export const runtime = 'nodejs';

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

type IncomingMessage = {
  role?: string;
  content?: string;
};

function createOfflineReply(userText: string) {
  const text = userText.toLowerCase();

  if (text.includes('movie') || text.includes('film')) {
    return 'You can book movies from the Movies tab. Popular picks right now: Dune: Part Two, Oppenheimer, The Batman, and Inception.';
  }

  if (text.includes('event') || text.includes('concert') || text.includes('show')) {
    return 'You can book events from the Events tab. Current highlights: Coldplay concert and Standup Comedy Special.';
  }

  if (text.includes('ticket') || text.includes('book')) {
    return 'To book tickets, open Movies or Events, select your show, then choose seats and continue to checkout.';
  }

  return 'I can help with movie and event bookings. Ask me for recommendations, show details, or booking steps.';
}

export async function POST(req: Request) {
  let lastUserMessage = '';
  try {
    const body = await req.json().catch(() => ({}));
    const rawMessages: IncomingMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const messages = rawMessages
      .filter((m) => typeof m?.content === 'string' && m.content.trim().length > 0)
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content),
      }));

    lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: createOfflineReply(lastUserMessage) },
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
      reply: chatCompletion.choices[0]?.message?.content || createOfflineReply(lastUserMessage)
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { reply: createOfflineReply(lastUserMessage) },
      { status: 200 }
    );
  }
}
