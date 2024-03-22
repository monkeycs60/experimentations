'use server';

import prisma from '@/lib/prisma';

export async function getAllCryptos() {
	const cryptocurrencies = await prisma.cryptocurrency.findMany();
	return cryptocurrencies;
}
