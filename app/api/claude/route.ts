// app/api/claude/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
	const { bitcoinPrices } = await request.json();
	const filteredBitcoinPrices = bitcoinPrices.filter(
		(_: any, index: number) => index % 3 === 0
	);

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
						Can you continue this table by adding price predictions for the next 30 days with an interval of 1 day (every day, and note every 3 days like in the dataset I provide you)? Please provide the results in JSON format. Do not add comment, just produce an output beginning by { and ending with }. Do not make linear prediction: help you with past data to reproduce the value swing over time. The price today is ${
							filteredBitcoinPrices[filteredBitcoinPrices.length - 1]
								.price
						} USD. The last date is ${
								filteredBitcoinPrices[filteredBitcoinPrices.length - 1]
									.date
							}`,
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
