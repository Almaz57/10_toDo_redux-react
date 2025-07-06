export const INPUT_MODES = {
	ADD: 'INPUT_MODE_ADD',
	SEARCH: 'INPUT_MODE_SEARCH',
};

export const SORT_MODES = {
	ALPHABET: 'SORT_MODE_ALPHABET',
	CREATION_TIME: 'SORT_MODE_CREATION_TIME',
};

export const filterReduceTypes = {
	SET_INPUT_MODE: 'SET_INPUT_MODE',
	SET_SORT_MODE: 'SET_SORT_MODE',
	SET_INPUT_TEXT: 'SET_INPUT_TEXT',
};

const initialState = {
	inputMode: INPUT_MODES.ADD,
	sortMode: SORT_MODES.CREATION_TIME,
	inputText: '',
};

export const filterReduce = (state = initialState, action) => {
	switch (action.type) {
		// UI
		case filterReduceTypes.SET_INPUT_MODE:
			return { ...state, inputMode: action.payload };

		case filterReduceTypes.SET_SORT_MODE:
			return { ...state, sortMode: action.payload };

		case filterReduceTypes.SET_INPUT_TEXT:
			return { ...state, inputText: action.payload };

		default:
			return state;
	}
};
