'use server';

import prisma from '@/lib/prisma';

export async function getCoinsList() {
	const cryptocurrencies = await prisma.cryptoDataGecko.findMany();
	return cryptocurrencies;
}
