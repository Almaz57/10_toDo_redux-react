import { combineReducers } from 'redux';
import { taskReduce } from './tasksReducer';
import { filterReduce } from './filterReducer';

export const rootReducer = combineReducers({
	taskState: taskReduce,
	filterState: filterReduce,
});
