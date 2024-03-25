type StatsCardProps = {
	statsTitle: string;
	netProfit: number;
	percentage: number;
	timeFrame: string;
};

const StatsCard = ({
	statsTitle,
	netProfit,
	percentage,
	timeFrame,
}: StatsCardProps) => {
	return (
		<article className='rounded-lg border border-gray-100 bg-white p-6'>
			<div>
				<p className='text-sm text-gray-500'>{statsTitle}</p>

				<p className='text-2xl font-medium text-gray-900'>${netProfit}</p>
			</div>

			<div
				className={`mt-1 flex gap-1 
                ${percentage > 0 ? 'text-green-600' : 'text-red-600'}
            `}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='size-4'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
					/>
				</svg>

				<p className='flex gap-2 text-xs'>
					<span className='font-medium'>{percentage}%</span>
					<span className='text-gray-500'> Since {timeFrame} </span>
				</p>
			</div>
		</article>
	);
};

export default StatsCard;
