export function generateRandomGradient() {
	const allColor = [
		'red',
		'yellow',
		'pink',
		'indigo',
		'gray',
		'orange',
		'teal',
		'cyan',
		'emerald',
		'lime',
		'rose',
		'amber',
		'violet',
		'fuchsia',
		'sky',
		'cyan',
		'blue',
		'purple',
		'green',
	];
	const allGradient = [100, 200, 300, 400, 500, 600, 700, 800, 900];
	const getRandomColor = () => {
		const randomColorIndex = Math.floor(Math.random() * allColor.length);
		const randomGradientIndex = Math.floor(
			Math.random() * allGradient.length
		);
		return `${allColor[randomColorIndex]}-${allGradient[randomGradientIndex]}`;
	};

	const color1 = getRandomColor();
	const color2 = getRandomColor();
	const color3 = getRandomColor();

	return `bg-gradient-to-r from-${color1} via-${color2} to-${color3}`;
}
