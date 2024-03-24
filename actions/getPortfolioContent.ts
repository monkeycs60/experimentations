"use server";

import prisma from '@/lib/prisma';

export async function getPortfolioContent() {
    const portfolioContent = await prisma.geckoCoinID.findMany();
    return portfolioContent;
}