import { useEffect, useRef } from 'react';
import { useDebounce } from '../components/index';
import { setTasksAsync } from '../redux/actions/taskActions';
import { useDispatch } from 'react-redux';
import { INPUT_MODES, SORT_MODES } from '../redux/reducers';

export const useRequestGet = (flagToSort, flagFilter, inputText) => {
	const prevParams = useRef(null);

	const debouncedInputText = useDebounce(inputText, 500);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('get запрос');

		const currentParams = {
			sort: flagToSort,
			filter: flagFilter,
			searchText:
				flagFilter === INPUT_MODES.SEARCH ? debouncedInputText.trim() : '',
		};

		const isSameParams =
			prevParams.current &&
			prevParams.current.sort === currentParams.sort &&
			prevParams.current.filter === currentParams.filter &&
			(currentParams.filter === INPUT_MODES.SEARCH
				? prevParams.current.searchText === currentParams.searchText
				: true);

		if (isSameParams) return;

		const params = new URLSearchParams();

		if (currentParams.sort === SORT_MODES.ALPHABET) {
			params.append('_sort', 'title');
			params.append('_order', 'asc');
		}

		if (currentParams.filter === INPUT_MODES.SEARCH && currentParams.searchText) {
			params.append('title_like', currentParams.searchText);
		}

		const url = `http://localhost:3000/tasks?${params.toString()}`;
		console.log('fetch url:', url);

		// setIsLoading(true);
		// fetch(url)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setTaskList(data);
		// 		prevParams.current = currentParams;
		// 	})
		// 	.finally(() => setIsLoading(false));
		dispatch(setTasksAsync(url, prevParams, currentParams));
	}, [flagToSort, flagFilter, debouncedInputText, dispatch, prevParams]);
};
