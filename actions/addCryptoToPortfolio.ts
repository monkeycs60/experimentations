'use server';

import prisma from '@/lib/prisma';
import getServerSession from 'next-auth';


// Supposons que `userId` est l'identifiant de l'utilisateur qui veut ajouter une crypto à son portfolio
// et `selectedCrypto` contient les informations de la crypto à ajouter.
export async function addCryptoToPortfolio(userId, selectedCrypto) {
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
			userId: userId,
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

	return { message: 'Crypto added to portfolio successfully.' };
}
