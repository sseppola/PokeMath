import { isServerRender, localStorageServer } from './isServerRender';

/**
 * Sveltekit will render the page server side, in this scenario the entire
 * window object does not exist, so we have not localStorage. This creates
 * a temporary localStorage object for the "server side" render so it does
 * not throw an error.
 */
let localStorage = localStorageServer;
if (!isServerRender()) {
	localStorage = window.localStorage;
}

interface StorageMap {
	xmasOpened: number[];
	xmasYear: number;

	// shop storage
	shinyLevel: number;
	mythicLevel: number;
	legendLevel: number;
	specialLevel: number;
	coinLevel: number;
	playerIcon: string;
	shopBackground: string;

	// player storage
	username: string;
	money: number;
	pkmncaught: number;
	tier1Solved: number;
	tier2Solved: number;
	tier3Solved: number;
	tier4Solved: number;
	tier5Solved: number;
	customSolved: number;
}

type StorageKeys = keyof StorageMap;

export function getStorageItem<KeyT extends StorageKeys>(key: KeyT): Partial<StorageMap>[KeyT] {
	const item = localStorage.getItem(key);
	if (item) {
		return JSON.parse(item);
	}

	return undefined;
}

export function setStorageItem<KeyT extends StorageKeys>(key: KeyT, value: StorageMap[KeyT]): void {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @deprecated use getStorageItem
 */
export function getStorageArray(key: string, splitter = ',') {
	if (localStorage.getItem(key)) {
		const array = (localStorage.getItem(key) ?? '').split(splitter);
		if (array.length < 1) {
			return [];
		}
		return array;
	} else {
		return [];
	}
}

/**
 * @deprecated use getStorageItem
 */
export function getStorageInt(key: string) {
	if (localStorage.getItem(key)) {
		const numberStr = JSON.parse(localStorage.getItem(key) ?? '');
		const number = parseInt(numberStr, 10);
		if (!isNaN(number)) {
			return number;
		}
	}
	return 0;
}

export function clearStorage() {
	window.localStorage.clear();
	window.sessionStorage.clear();
}
