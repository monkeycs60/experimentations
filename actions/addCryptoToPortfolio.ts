'use server';

import prisma from '@/lib/prisma';
import { GeckoCoinID } from '@/types/geckoCoinID';

export async function addCryptoToPortfolio(selectedCrypto: GeckoCoinID) {
	const crypto = await prisma.geckoCoinID.create({
		data: {
			id: selectedCrypto.id,
			symbol: selectedCrypto.symbol,
			name: selectedCrypto.name,
			web_slug: selectedCrypto.web_slug || undefined,
			description: selectedCrypto.description || undefined,
			image: selectedCrypto.image || undefined,
			market_cap_rank: selectedCrypto.market_cap_rank || undefined,
			market_data: selectedCrypto.market_data || undefined,
			community_data: selectedCrypto.community_data || undefined,
			developer_data: selectedCrypto.developer_data || undefined,
			last_updated: selectedCrypto.last_updated || undefined,
		},
	});

	// ajoute la crypto au portfolio de l'utilisateur
	await prisma.userPortfolio.upsert({
		where: { userId: userId},
		update: {
			geckoCoinID: {
				connect: {
					id: crypto.id,
				},
			},
		},
		create: {
			userId,
			geckoCoinID: {
				connect: {
					id: crypto.id,
				},
			},
		},
	});

	return crypto;
}
