import CryptoAssetCard from '../ui/CryptoAssetCard';

const MyCryptoGrid = () => {
	return (
		<div
			className='
        grid grid-cols-4 gap-4 
    '>
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
			<CryptoAssetCard />
		</div>
	);
};

export default MyCryptoGrid;
