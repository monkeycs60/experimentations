// app/api/claude/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
	const { bitcoinPrices } = await request.json();

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
							text: `Voici un tableau d'objets contenant les dates et les prix du bitcoin pour l'année précédente :\n\n${JSON.stringify(
								bitcoinPrices,
								null,
								2
							)}\n\nPouvez-vous continuer ce tableau en ajoutant des prédictions de prix pour les 2 prochains mois ? Veuillez fournir les résultats au format JSON.`,
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
