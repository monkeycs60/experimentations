import { NextResponse } from 'next/server';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const MODEL_NAME = 'gemini-1.0-pro-001';
const API_KEY = process.env.GOOGLE_API_KEY || '';

export async function POST(req: Request) {
	const { messages } = await req.json();

	try {
		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 0.2,
			topK: 1,
			topP: 1,
			maxOutputTokens: 2048,
			
		};

		const chat = model.startChat({
			generationConfig,
			history: [],
		});

		const result = await chat.sendMessage(messages[0].content);
		const response = result.response;
		console.log(response.text());

		return NextResponse.json({ completion: response.text() });
	} catch (error) {
		console.error('Error fetching ggggemini completion:', error);
		return new Response('Error fetching gemini completion', {
			status: 500,
		});
	}
}
