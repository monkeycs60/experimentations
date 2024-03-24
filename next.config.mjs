/** @type {import('next').NextConfig} */
const nextConfig = {
	staticPageGenerationTimeout: 120,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
