import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: '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',
	baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: Request) {
	const { messages } = await request.json();

	try {
		const completion = await openai.chat.completions.create({
			messages,
			model: 'Mixtral-8x7b-32768',
			// response_format: { type: 'json_object' },
		});
		const assistantMessage = completion.choices[0].message.content;

		// Nettoyage de la chaîne de caractères pour obtenir un JSON valide
		if (assistantMessage) {
			const cleanedMessage = assistantMessage
				.replace(/\\n/g, '')
				.replace(/\\"/g, '"');

			// Analyse de la chaîne JSON en objet JavaScript
			const parsedResponse = JSON.parse(cleanedMessage);
			return NextResponse.json(parsedResponse);
		} else {
			return NextResponse.json(
				{ error: 'Failed to fetch Gemma server completion' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error fetching Gemma backend completion:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch Gemma server completion' },
			{ status: 500 }
		);
	}
}
