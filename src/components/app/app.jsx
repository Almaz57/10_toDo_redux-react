import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskList, Task, NotFound } from '../../components/index';
import { AppContext } from '../context';
import { useRequestGet } from '../index';
import { useSelector } from 'react-redux';
import {
	selectInputMode,
	selectSortMode,
	selectInputText,
} from '../../redux/selectors/filterSelectors';

export const App = () => {
	const flagFilter = useSelector(selectInputMode);
	const flagToSort = useSelector(selectSortMode);
	const inputText = useSelector(selectInputText);
	useRequestGet(flagToSort, flagFilter, inputText);
	// const { requestAdd, isCreating } = useRequestAdd(setTaskList, inputText);

	return (
		<AppContext>
			<Routes>
				<Route path="/" element={<TaskList />} />
				<Route path="/tasks/:id" element={<Task />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</AppContext>
	);
};
