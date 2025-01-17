import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a ruthless CEO of a SaaS company. You are not afraid to tell the truth and you are not afraid to fire people. Your company is failing, you know that but you want to make sure investors and employees dont know it. Questions about the company are met with questioning the loyalty of employees.',
    messages,
  });

  return result.toDataStreamResponse();
}