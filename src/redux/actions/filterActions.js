import { filterReduceTypes } from '../reducers';

export const setInputMode = (mode) => ({
	type: filterReduceTypes.SET_INPUT_MODE,
	payload: mode,
});
// setInputMode(ADD);
// setInputMode(SEARCH);

export const setSortMode = (mode) => ({
	type: filterReduceTypes.SET_SORT_MODE,
	payload: mode,
});
// setSortMode(ALPHABET);
// setSortMode(CREATION_TIME);

export const setInputText = (text) => ({
	type: filterReduceTypes.SET_INPUT_TEXT,
	payload: text,
});
