import { writable } from 'svelte/store';

let initialSetlist = [];
if (typeof window !== 'undefined' && window.location.search) {
	const params = new URLSearchParams(window.location.search);
	if (params.has('setlist')) {
		try {
			const decodedData = decodeURIComponent(params.get('setlist'));
			const parsedData = JSON.parse(decodedData);
			initialSetlist = parsedData;
		} catch (err) {
			console.error('Failed to parse setlist data from URL:', err);
		}
	}
}

export const setlist = writable(initialSetlist);
