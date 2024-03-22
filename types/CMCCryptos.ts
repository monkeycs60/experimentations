export interface CMCResponse {
	data: CMCData[];
	status: CMCStatus;
}

export interface CMCData {
	id: number;
	name: string;
	symbol: string;
	slug: string;
	cmc_rank: number;
	num_market_pairs: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	infinite_supply: boolean;
	last_updated: string;
	date_added: string;
	tags: string[];
	platform: Platform;
	self_reported_circulating_supply: null;
	self_reported_market_cap: null;
	quote: CMCQuote;
}

interface CMCQuote {
	USD: CMCCurrency;
	[key: string]: CMCCurrency;
}

interface CMCCurrency {
	price: number;
	volume_24h: number;
	volume_change_24h: number;
	percent_change_1h: number;
	percent_change_24h: number;
	percent_change_7d: number;
	market_cap: number;
	market_cap_dominance: number;
	fully_diluted_market_cap: number;
	last_updated: string;
}

interface Platform {
	id: number;
	name: string;
	symbol: string;
	slug: string;
	token_address: string;
}

interface CMCStatus {
	timestamp: string;
	error_code: number;
	error_message: string;
	elapsed: number;
	credit_count: number;
}
