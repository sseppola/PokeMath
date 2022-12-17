import { isServerRender } from './isServerRender';

export function checkACookieExists(name: string) {
	// svelte kit server side rendering short circuit
	if (isServerRender()) {
		return false;
	}

	const cookieParts = document.cookie.split(';');
	const hasCookieWithName = cookieParts.some((item) => {
		return item.trim().startsWith(name + '=');
	});

	return hasCookieWithName;
}

export function setAcceptCookies() {
	const expiryDate = new Date();
	expiryDate.setTime(expiryDate.getTime() + 90 * 24 * 60 * 60 * 1000); //90 days from today
	document.cookie = `cookies=true;SameSite=Lax;expires=${expiryDate.toUTCString()};path=/`;
}
