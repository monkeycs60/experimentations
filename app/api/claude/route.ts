// app/api/claude/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
	const { bitcoinPrices } = await request.json();
	const filteredBitcoinPrices = bitcoinPrices.slice(bitcoinPrices.length / 2);

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
							text: `
Here is a table of objects containing the dates and prices of Bitcoin for the previous year:
${JSON.stringify(filteredBitcoinPrices, null, 2)}

Can you continue this table by adding price predictions for the next 2 months? Do not add any comment please nor advice or anything. Please provide the results in a valid JSON array of objects with the fields "date" (ISO date string) and "price" (number). Do not add any comment or reflexion, just the array of JSON. Do not make any advice. I just want raw datas.
`,
						},
					],
				},
			],
			model: 'claude-3-haiku-20240307',
		});

		console.log('Claude opinion:', message.content);

		return NextResponse.json({ opinion: message.content });
	} catch (error) {
		console.error('Error fetching Claude opinion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Claude opinion' },
			{ status: 500 }
		);
	}
}
