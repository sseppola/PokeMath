export function isServerRender() {
	return typeof window === 'undefined';
}

type LocalStorageT = typeof window.localStorage;
export const localStorageServer: LocalStorageT = {
	getItem: () => '',
	setItem: () => {
		// no operation
	},
	removeItem: () => {
		// no operation
	},
	length: 0,
	key: () => null,
	clear: () => {
		// no operation
	}
};
