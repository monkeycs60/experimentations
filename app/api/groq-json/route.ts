import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { format } from 'date-fns';

const openai = new OpenAI({
	apiKey: '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',
	baseURL: 'https://api.perplexity.ai',
});

export async function POST(request: Request) {
	const { bitcoinPrices } = await request.json();
	console.log('un monde où', bitcoinPrices);
	// const filteredBitcoinPrices = bitcoinPrices;
	// JE VEUX récupérer la deuxième moitié du table
	const filteredBitcoinPrices = bitcoinPrices.slice(bitcoinPrices.length / 2);
	console.log('filteredBitcoinPrices', filteredBitcoinPrices);

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `
Here is a table of objects containing the dates and prices of Bitcoin for the previous year:
${JSON.stringify(filteredBitcoinPrices, null, 2)}

Can you continue this table by adding price predictions for the next 2 months? Do not add any comment please nor advice or anything. Please provide the results in a valid JSON array of objects with the fields "date" (ISO date string) and "price" (number). Do not add any comment or reflexion, just the array of JSON. Do not make any advice. I just want raw datas.
`,
				},
			],
			model: 'mixtral-8x7b-instruct',
			max_tokens: 4000,
		});
		const assistantMessage = completion.choices[0].message.content;
		console.log('assistantMessage', assistantMessage);

		if (assistantMessage) JSON.parse(assistantMessage);

		console.log('assistantMessage', assistantMessage);

		return NextResponse.json(
			assistantMessage || { error: 'No assistant message' }
		);
	} catch (error) {
		console.error('Error fetching Gemma backend completion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Gemma server completion' },
			{ status: 500 }
		);
	}
}
