'use client';

import React from 'react';

const CryptoNews = (cryptoNews: any) => {
	console.log(cryptoNews);

	return (
		<div>
			<p>hello les gens</p>
			{cryptoNews &&
				cryptoNews.cryptoNews.map((news: any) => (
					<div key={news.id}>
						<h1>{news.title}</h1>
					</div>
				))}
		</div>
	);
};

export default CryptoNews;
