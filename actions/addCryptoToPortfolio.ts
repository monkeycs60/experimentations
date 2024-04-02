'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { GeckoCoinID } from '@/types/geckoCoinID';
import { revalidatePath } from 'next/cache';

export async function addCryptoToPortfolio(
	userId: string,
	selectedCrypto: GeckoCoinID
) {
	const session = await auth();
	console.log(session);

	// Vérifier si le GeckoCoinID existe déjà, sinon le créer
	let crypto = await prisma.geckoCoinID.findUnique({
		where: {
			id: selectedCrypto.id,
		},
	});

	if (!crypto) {
		crypto = await prisma.geckoCoinID.create({
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
	}

	// Assurez-vous que l'utilisateur a un portfolio
	let portfolio = await prisma.portfolio.findUnique({
		where: {
			userId: session?.user?.id,
		},
	});

	if (!portfolio) {
		// Créer un portfolio si l'utilisateur n'en a pas
		portfolio = await prisma.portfolio.create({
			data: {
				userId: userId,
				// Initialisation avec la crypto sélectionnée
				geckoCoins: {
					connect: [{ id: crypto.id }],
				},
			},
		});
	} else {
		// Ajouter la crypto au portfolio existant de l'utilisateur
		await prisma.portfolio.update({
			where: {
				id: portfolio.id,
			},
			data: {
				geckoCoins: {
					connect: [{ id: crypto.id }],
				},
			},
		});
	}

	revalidatePath('/');

	return { message: 'Crypto added to portfolio successfully.' };
}
