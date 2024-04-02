'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { GeckoCoinID } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getPortfolioData() {
	const session = await auth();
	console.log(session);

	if (!session || !session.user) {
		return null;
	}
	const portfolio = await prisma.portfolio.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			geckoCoins: true,
		},
	});

	return portfolio[0].geckoCoins;
}
