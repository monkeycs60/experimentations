// app/api/claude/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
	apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
	const { cryptoName, cryptoPrice } = await request.json();

	try {
		const message = await anthropic.messages.create({
			max_tokens: 4000,
			temperature: 0,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: `What do you think about ${cryptoName}, the current price is ${cryptoPrice} USD ? Write a poem about it`,
						},
					],
				},
			],
			model: 'claude-3-haiku-20240307',
		});

		return NextResponse.json({ opinion: message.content });
	} catch (error) {
		console.error('Error fetching Claude opinion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Claude opinion' },
			{ status: 500 }
		);
	}
}
