'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export const LoginButton = () => {
	const session = useSession();

	return (
		<div className='flex w-screen items-center justify-end gap-4 bg-slate-300 px-8 py-6 text-sm'>
			{session?.data?.user ? (
				<>
					<div>
						<p>Logged in as {session?.data?.user?.email}</p>
					</div>
					<button
						className='rounded-full bg-black/60 px-4 py-2  text-white hover:bg-gray-500'
						onClick={async () => {
							await signOut();
						}}>
						Se déconnecter
					</button>
				</>
			) : (
				<>
					<button
						className='rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
						onClick={async () => {
							await signIn('google');
						}}>
						Sign in with Google
					</button>
					<button
						className='rounded-full bg-black px-4 py-2  text-white hover:bg-gray-700'
						onClick={async () => {
							await signIn('github');
						}}>
						Sign in with GitHub
					</button>
				</>
			)}
		</div>
	);
};
