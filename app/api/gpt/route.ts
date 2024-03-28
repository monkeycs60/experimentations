import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY || '',
});

export const runtime = 'edge';

export interface TokenPricePrediction {
	token_name: string;
	price_1st_february_2024: string;
	price_1st_march_2024: string;
	price_1st_april_2024: string;
	price_1st_july_2024: string;
}

export async function POST(request: Request) {
	const { messages } = await request.json();

	const cryptoName = 'solana'; // Remplacez par le nom de la crypto souhaitée
	const url = `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=60&interval=daily`;
	const options = {
		method: 'GET',
		headers: { 'x-cg-demo-api-key': 'CG-UiA8wLTHpsZkFrZtVcSu7Fpo' },
	};

	const res = await fetch(url, options);
	const data = await res.json();

	console.log(data);

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: messages[0].content,
				},
				{
					role: 'system',
					content: `
                        ${data} is the price of ${cryptoName} in USD these last 60 days. From this data provided, talk to me about the price evolution. Thank you
                    `,
				},
			],
			model: 'gpt-4-0125-preview',
			// response_format: { type: 'json_object' },
		});
		const assistantMessage = completion.choices[0].message.content;
		// const tokenPrice: TokenPricePrediction = JSON.parse(
		// 	assistantMessage as string
		// );

		return NextResponse.json(assistantMessage);
	} catch (error) {
		console.error('Error fetching Gemma backend completion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Gemma server completion' },
			{ status: 500 }
		);
	}
}
