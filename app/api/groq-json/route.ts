import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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',
	baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: Request) {
	const { bitcoinPrices } = await request.json();
	console.log('un monde où', bitcoinPrices);
	const filteredBitcoinPrices = bitcoinPrices.filter(
		(_: any, index: number) => index % 7 === 0
	);

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `
						Here is a table of objects containing the dates and prices of Bitcoin for the previous year: ${JSON.stringify(
							filteredBitcoinPrices,
							null,
							2
						)}
						Can you continue this table by adding price predictions for the next 2 months? Please provide the results in an array of json objects.`,
				},
				{
					role: 'system',
					content: `
						You'll respond with a JSON array with as many objects as days, with always the same fields : date (date format) and price (number). It should predict bitcoin prices for the next 2 months. The structure is : 
						[
							{json object 1},
							{json object 2},
							etc.
						] 
						.`,
				},
			],
			model: 'Mixtral-8x7b-32768',
			response_format: { type: 'json_object' },
			max_tokens: 4000,
		});
		const assistantMessage = completion.choices[0].message.content;
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
