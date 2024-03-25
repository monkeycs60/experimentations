import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import GitHub from 'next-auth/providers/github';

export const { handlers, auth } = NextAuth({
	providers: [
		GitHub,
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		session: async ({ session, user }) => {
			if (session.user) {
				session.user.id = user.id;
			}
		},
	},
});
