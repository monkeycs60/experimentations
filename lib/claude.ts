import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
	apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

export default anthropic;
