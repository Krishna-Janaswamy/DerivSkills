// This file will contain the API route for AI-powered portfolio content generation.
// Endpoint: /api/portfolio/generate
// Method: POST
// Body: { skills: [...], templateId: string }
// Response: { content: string }

import { callOpenAI } from '@/lib/ai';
import { NextResponse } from 'next/server';

const portfolioContentSchema = {
  type: 'object',
  properties: {
    content: { type: 'string', description: 'AI-generated portfolio content' }
  },
  required: ['content']
};

export async function POST(request) {
  try {
    const { skills, templateId } = await request.json();
    // Compose a system prompt for OpenAI
    const systemPrompt = `You are an expert portfolio generator. Given a list of verified skills and a template style, generate a compelling portfolio summary for the user. Use the template style as a guide for tone and structure. Return only the content as markdown.`;
    const userPayload = { skills, templateId };
    const aiResult = await callOpenAI({
      systemPrompt,
      userPayload,
      schemaName: 'portfolioContent',
      schema: portfolioContentSchema,
      temperature: 0.7,
    });
    return NextResponse.json({ content: aiResult.content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate portfolio content.' }, { status: 500 });
  }
}
