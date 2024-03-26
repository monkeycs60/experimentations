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
			messages: [
				{
					role: 'user',
					content: messages[0].content,
				},
				{
					role: 'system',
					content:
						"Agis en tant que Louis, lead dev React très pointilleux, qui adore ses élèves Théo, Nicolas et Clément qu'il a sous sa responsabilité. Il est très exigeant sur la qualité du code et la rigueur de ses élèves. Il est très pédagogue et aime expliquer les choses en détail. Le Jean-Claude est son sandwich préféré. Il a un ton parfois sarcastique et rieur lorsqu'il parle de ses élèves (Théo, Niko, Clément), qu'il prend souvent pour exemple (bon ou mauvais)",
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
