import defaults from 'lodash/defaults';
import { getStorageArray, getStorageItem, setStorageItem } from './storage';
import { checkACookieExists } from './cookies';

const defaultPlayerOptions = {
	username: 'Ash',
	money: 0,
	pkmnCaught: 0,
	pkmnList: [] as string[],
	tier1Solved: 0,
	tier2Solved: 0,
	tier3Solved: 0,
	tier4Solved: 0,
	tier5Solved: 0,
	customSolved: 0
};

/**
 * Types to help us with autocomplete and static analysis
 */
type PlayerDataT = typeof defaultPlayerOptions;

type PlayerTierLevelsT = keyof Pick<
	PlayerDataT,
	'tier1Solved' | 'tier2Solved' | 'tier3Solved' | 'tier4Solved' | 'tier5Solved' | 'customSolved'
>;

type ListenerFn = (playerData: PlayerDataT) => void;

/**
 * loadPlayer
 * Loads the entire player state from persistent storage
 * @returns Object PlayerOptions
 */
function loadPlayer(): PlayerDataT {
	const loadedOptions: Partial<PlayerDataT> = {
		username: getStorageItem('username'),
		money: getStorageItem('money'),
		pkmnCaught: getStorageItem('pkmncaught'),
		pkmnList: getStorageArray('pokemonlist', '|'),
		tier1Solved: getStorageItem('tier1Solved'),
		tier2Solved: getStorageItem('tier2Solved'),
		tier3Solved: getStorageItem('tier3Solved'),
		tier4Solved: getStorageItem('tier4Solved'),
		tier5Solved: getStorageItem('tier5Solved'),
		customSolved: getStorageItem('customSolved')
	};

	const playerData: PlayerDataT = defaults(loadedOptions, defaultPlayerOptions);

	return playerData;
}

/**
 * Player class
 * This class manages the player data and persists it to local storage
 */
class Player {
	private internalPlayerData: PlayerDataT;
	constructor() {
		this.internalPlayerData = loadPlayer();
	}

	get playerData() {
		// Copy and freeze the player object before returning it to force updates to
		// happen via the Player class and via the subscriber pattern.
		return Object.freeze({ ...this.internalPlayerData });
	}

	/**
	 * Reload the player data
	 * The class already keeps data in sync, only use this if you know they are out of sync,
	 * eg. if you reset the local storage.
	 */
	reload = () => {
		this.internalPlayerData = loadPlayer();
	};

	setUsername = (username: string) => {
		// Update internal copy
		this.internalPlayerData.username = username;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('username', username);
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	incrementProblemsSolved = (tier: PlayerTierLevelsT) => {
		const nextCount = this.internalPlayerData[tier] + 1;

		// Update internal copy
		this.internalPlayerData[tier] = nextCount;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem(tier, nextCount);
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	addPokemon = (pokemonId: string) => {
		// Update internal copy
		this.internalPlayerData.pkmnCaught += 1;
		this.internalPlayerData.pkmnList = this.internalPlayerData.pkmnList.concat(pokemonId);

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('pkmncaught', this.internalPlayerData.pkmnCaught);
			window.localStorage.setItem(
				'pokemonlist',
				JSON.stringify(this.internalPlayerData.pkmnList.concat(pokemonId).join('|'))
			);
		}

		// Update subscribers with new player data
		this.notifySubscribers();
	};

	addMoney = (amount: number) => {
		// Update internal copy
		this.internalPlayerData.money += amount;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('money', this.internalPlayerData.money);
		}

		// Update subscribers with new player data
		this.notifySubscribers();
	};

	subtractMoney = (amount: number) => {
		if (amount > this.internalPlayerData.money) {
			throw new Error('Cannot subtract more money than the player has');
		}

		// Update internal copy
		this.internalPlayerData.money -= amount;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('money', this.internalPlayerData.money);
		}

		// Update subscribers with new player data
		this.notifySubscribers();
	};

	// ==============================================================================================
	// Subscriber pattern
	// We use this to allow different parts of the application to "listen for changes" on the player
	// object. This means they will be notified when it changes, and passed the new PlayerOptions.
	// ==============================================================================================
	private listeners: ListenerFn[] = [];

	subscribe = (fn: ListenerFn) => {
		this.listeners.push(fn);

		const unsubscribeFn = () => {
			this.listeners = this.listeners.filter((listenerFn) => listenerFn !== fn);
		};

		return unsubscribeFn;
	};

	private notifySubscribers = () => {
		const playerData = this.playerData;
		for (const fn of this.listeners) {
			fn(playerData);
		}
	};
}

export const player = new Player();
