import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFetchLoading,
	selectAddLoading,
} from '../../redux/selectors/taskSelectors.js';

import {
	selectInputMode,
	selectSortMode,
	selectInputText,
} from '../../redux/selectors/filterSelectors.js';
import {
	setInputMode,
	setInputText,
	setSortMode,
} from '../../redux/actions/filterActions.js';
import { addTaskAsync } from '../../redux/actions/taskActions.js';
import { INPUT_MODES, SORT_MODES } from '../../redux/reducers/filterReducer.js';

export const Form = () => {
	const inputText = useSelector(selectInputText);
	const flagToSort = useSelector(selectSortMode);
	const inputMode = useSelector(selectInputMode); // 'add' или 'search'
	const flagFilter = inputMode === INPUT_MODES.SEARCH;
	const isCreating = useSelector(selectAddLoading);
	const isLoading = useSelector(selectFetchLoading);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(setInputText(e.target.value));
	};

	const toggleInputMode = () => {
		dispatch(
			setInputMode(
				inputMode === INPUT_MODES.SEARCH ? INPUT_MODES.ADD : INPUT_MODES.SEARCH,
			),
		);
	};

	const toggleSortMode = () => {
		dispatch(
			setSortMode(
				flagToSort === SORT_MODES.ALPHABET
					? SORT_MODES.CREATION_TIME
					: SORT_MODES.ALPHABET,
			),
		);
	};

	const requestAdd = (inputText) => {
		dispatch(addTaskAsync(inputText));
	};

	return (
		<>
			<div className={styles.form}>
				<input
					className={styles.input}
					type="text"
					value={inputText}
					onChange={handleChange}
				></input>
				<button
					className={styles.chgBtn}
					disabled={isCreating}
					onClick={() => toggleInputMode()}
				>
					{flagFilter ? 'To Add' : 'To search'}
				</button>
				<button
					className={
						flagToSort === SORT_MODES.ALPHABET
							? styles.sortBtnTrue
							: styles.sortBtn
					}
					disabled={isLoading}
					onClick={() => toggleSortMode()}
				>
					<svg className={styles.svgSortBtn} viewBox="0 0 24 24">
						<path d="M3 6h18M6 12h12M9 18h6" />
					</svg>
					Sort
				</button>
			</div>
			{!flagFilter && (
				<div className={styles.form}>
					<button
						className={styles.addBtn}
						disabled={isCreating}
						onClick={() => requestAdd(inputText)}
					>
						+ Add
					</button>
				</div>
			)}
		</>
	);
};
