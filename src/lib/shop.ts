import defaults from 'lodash/defaults';
import { getStorageArray, getStorageItem, setStorageItem } from './storage';
import { checkACookieExists } from './cookies';

const defaultShopOptions = {
	background: '',
	playerIcon: '',
	boughtBackgrounds: [] as string[],
	boughtPlayerIcons: [] as string[],
	shinyLevel: 1,
	mythicLevel: 0,
	legendLevel: 0,
	specialLevel: 0,
	coinLevel: 0
};

type ShopOptionsT = typeof defaultShopOptions;
type ShopLevelOptionsT = keyof Pick<
	ShopOptionsT,
	'coinLevel' | 'legendLevel' | 'mythicLevel' | 'shinyLevel' | 'specialLevel'
>;

type ListenerFn = (shopData: ShopOptionsT) => void;

/**
 * loadShop
 * Loads the entire shop state from persistent storage
 * @returns Object shopOptions
 */
function loadShop(): ShopOptionsT {
	const loadedOptions: Partial<ShopOptionsT> = {
		background: getStorageItem('shopBackground'), //"images/backgrounds/bg-001.png"//
		playerIcon: getStorageItem('playerIcon'), //"images/backgrounds/bg-001.png"//
		mythicLevel: getStorageItem('mythicLevel'),
		legendLevel: getStorageItem('legendLevel'),
		specialLevel: getStorageItem('specialLevel'),
		shinyLevel: getStorageItem('shinyLevel'),
		coinLevel: getStorageItem('coinLevel'),
		// TODO: migrate getStorageArray to getStorageItem, passing normal arrays and no splitting
		boughtBackgrounds: getStorageArray('boughtBackgrounds', '|'),
		boughtPlayerIcons: getStorageArray('boughtPlayerIcons', '|')
	};

	const shopOptions: ShopOptionsT = defaults(loadedOptions, defaultShopOptions);
	if (shopOptions.shinyLevel == 0) {
		shopOptions.shinyLevel = 1;
	}

	return shopOptions;
}

class PokeShop {
	private internalShopOptions: ShopOptionsT;
	constructor() {
		this.internalShopOptions = loadShop();
	}

	get shopOptions() {
		// Copy and freeze the shop object before returning it to force updates to happen
		// via the PokeShop class and via the subscriber pattern.
		return Object.freeze({ ...this.internalShopOptions });
	}

	/**
	 * Reload the shop data
	 * The class already keeps data in sync, only use this if you know they are out of sync,
	 * eg. if you reset the local storage.
	 */
	reload = () => {
		this.internalShopOptions = loadShop();
	};

	increaseLevel = (key: ShopLevelOptionsT) => {
		const nextLevel = this.internalShopOptions[key] + 1;

		// Update internal copy
		this.internalShopOptions[key] = nextLevel;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem(key, nextLevel);
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	addBackground = (newBackground: string) => {
		// Concatenate newBackground to boughtBackgrounds to create an updated copy without modifying
		// the original array.
		const updatedBoughtBackgrounds =
			this.internalShopOptions.boughtBackgrounds.concat(newBackground);

		// Update internal copy
		this.internalShopOptions.boughtBackgrounds = updatedBoughtBackgrounds;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			localStorage.setItem('boughtBackgrounds', JSON.stringify(updatedBoughtBackgrounds.join('|')));
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	addPlayerIcon = (newPlayerIcon: string) => {
		// Concatenate newPlayerIcon to boughtPlayerIcons to create an updated copy without modifying
		// the original array.
		const updatedPlayerIcons = this.internalShopOptions.boughtPlayerIcons.concat(newPlayerIcon);

		// Update internal copy
		this.internalShopOptions.boughtPlayerIcons = updatedPlayerIcons;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			localStorage.setItem('boughtBackgrounds', JSON.stringify(updatedPlayerIcons.join('|')));
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	setBackground = (newBackground: string) => {
		// Update internal copy
		this.internalShopOptions.background = newBackground;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('shopBackground', newBackground); //"images/backgrounds/bg-001.png"//
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	setPlayerIcon = (newPlayerIcon: string) => {
		// Update internal copy
		this.internalShopOptions.playerIcon = newPlayerIcon;

		// Update persistent storage
		if (checkACookieExists('cookies')) {
			setStorageItem('playerIcon', newPlayerIcon); //"images/backgrounds/bg-001.png"//
		}

		// Update subscribers with new shop data
		this.notifySubscribers();
	};

	// ==============================================================================================
	// Subscriber pattern
	// We use this to allow different parts of the application to "listen for changes" on the shop
	// object. This means they will be notified when it changes, and passed the new shopOptions.
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
		const shopOptions = this.shopOptions;
		for (const fn of this.listeners) {
			fn(shopOptions);
		}
	};
}

export const shop = new PokeShop();
