import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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',
	baseURL: 'https://api.groq.com/openai/v1',
});

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

	const newdata = data.prices[0][1];


	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: messages[0].content,
				},
				{
					role: 'assistant',
					content: `
										describe me the ${newdata} you are receiving, quote it, give me its first value, or first key
						`,
				},
				{
					role: 'system',
					content: `
																			describe me the ${newdata} you are receiving, quote it, give me its first value, or first key

						`,
				},
			],
			model: 'Mixtral-8x7b-32768',
		});
		const assistantMessage = completion.choices[0].message.content;

		return NextResponse.json(assistantMessage);
	} catch (error) {
		console.error('Error fetching Gemma backend completion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Gemma server completion' },
			{ status: 500 }
		);
	}
}
