export async function statCounter(type: string, key: string) {
	const url = new URL(`https://api.countapi.xyz/${type}/pokemath.online/${key}`);

	try {
		const response = await fetch(url, {
			method: 'GET'
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function statCounterAmount(
	type: 'update',
	key: 'coinsEarned' | 'coinsSpendt',
	amount: number
) {
	const url = new URL(`https://api.countapi.xyz/${type}/pokemath.online/${key}?amount=${amount}`);

	try {
		const response = await fetch(url, {
			method: 'GET'
		});
		return response.json();
	} catch (error) {
		console.error(error);
	}
}
