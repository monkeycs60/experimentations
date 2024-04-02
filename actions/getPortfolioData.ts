'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { GeckoCoinID } from '@prisma/client';

export async function getPortfolioData() {
	const session = await auth();
	if (!session) {
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
