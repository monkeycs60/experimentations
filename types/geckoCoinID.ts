export type GeckoCoinID = {
	id: string;
	symbol: string;
	name: string;
	asset_platform_id: null | string;
	platforms: {
		[key: string]: string;
	};
	detail_platforms: {
		[key: string]: {
			decimal_place: null | number;
			contract_address: string;
		};
	};
	block_time_in_minutes: number;
	hashing_algorithm: null | string;
	categories: string[];
	localization: {
		[key: string]: string;
	};
	description: {
		[key: string]: string;
	};
	links: {
		homepage: string[];
		blockchain_site: string[];
		official_forum_url: string[];
		chat_url: string[];
		announcement_url: string[];
		twitter_screen_name: string;
		telegram_channel_identifier: string;
		subreddit_url: string;
		repos_url: {
			github: string[];
			bitbucket: any[];
		};
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	};
	market_data: {
		current_price: {
			usd: number;
			eur: number;
		};
		market_cap: {
			usd: number;
			eur: number;
		};
		total_volume: {
			usd: number;
			eur: number;
		};
		high_24h: {
			usd: number;
			eur: number;
		};
		low_24h: {
			usd: number;
			eur: number;
		};
		price_change_24h_in_currency: {
			usd: number;
			eur: number;
		};
		market_cap_change_24h_in_currency: {
			usd: number;
			eur: number;
		};
	};
	market_cap_rank: number;
	coingecko_rank: number;
	coingecko_score: number;
	developer_score: number;
	community_score: number;
	liquidity_score: number;
	public_interest_score: number;
};
