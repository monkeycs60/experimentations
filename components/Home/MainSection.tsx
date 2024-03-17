import React from 'react';
import { LoginButton } from '../Login/LoginButton';
import { auth } from '@/lib/auth';

const MainSection = async () => {
	const session = await auth();
	return (
		<>
			{session && <div>Logged in as {session?.user?.email}</div>}
			<LoginButton />
			<div>MainSection</div>
		</>
	);
};

export default MainSection;
