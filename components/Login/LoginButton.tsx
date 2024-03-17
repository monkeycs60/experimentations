'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export const LoginButton = () => {
	const session = useSession();

	return (
		<>
			<button
				className='rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
				onClick={async () => {
					await signIn('google');
				}}>
				Sign in with Google
			</button>
			<button
				className='rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-gray-700'
				onClick={async () => {
					await signIn('github');
				}}>
				Sign in with GitHub
			</button>
			{session?.data?.user && (
				<button
					onClick={async () => {
						await signOut();
					}}>
					Se déconnecter
				</button>
			)}
		</>
	);
};
