import { generateRandomTitle } from '../../components';
import { STATUS_OPERATIONS, TASK_OPERATIONS, taskReduceTypes } from '../reducers';

export const loading = (operationType, operationStatus) => ({
	type: taskReduceTypes.SET_LOADING,
	payload: {
		operation: operationType,
		status: operationStatus,
	},
});
// loading(TASK_OPERATIONS.ADD, STATUS_OPERATIONS.FALSE);

export const setTasks = (tasks) => ({
	type: taskReduceTypes.SET_TASKS,
	payload: tasks,
});
// setTasks([task1, task2, ....]);

export const addTask = (task) => ({
	type: taskReduceTypes.ADD_TASK,
	payload: task,
});
// addTask(task1);

export const deleteTask = (taskId) => ({
	type: taskReduceTypes.DELETE_TASK,
	payload: taskId,
});
// deleteTask(1750176804885);

export const updateTask = (taskId, changes) => ({
	type: taskReduceTypes.UPDATE_TASK,
	payload: { id: taskId, changes },
});
// updateTask(1750176804885, true);

export const setTasksAsync = (url, prevParams, currentParams) => (dispatch) => {
	dispatch(loading(TASK_OPERATIONS.FETCH, STATUS_OPERATIONS.TRUE));
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setTasks(data));
			prevParams.current = currentParams;
		})
		.finally(() => dispatch(loading(TASK_OPERATIONS.FETCH, STATUS_OPERATIONS.FALSE)));
};

export const addTaskAsync = (taskText) => (dispatch) => {
	dispatch(loading(TASK_OPERATIONS.ADD, STATUS_OPERATIONS.TRUE));
	taskText = taskText.trim() === '' ? generateRandomTitle() : taskText;
	fetch('http://localhost:3000/tasks', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			id: Date.now(),
			title: taskText,
			complete: false,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((newTask) => {
			dispatch(addTask(newTask));
		})
		.finally(() => dispatch(loading(TASK_OPERATIONS.ADD, STATUS_OPERATIONS.FALSE)));
};

export const deleteTaskAsync = (taskId) => (dispatch) => {
	dispatch(loading(TASK_OPERATIONS.DELETE, STATUS_OPERATIONS.TRUE));
	fetch(`http://localhost:3000/tasks/${taskId}`, {
		method: 'DELETE',
	})
		.then(() => {
			dispatch(deleteTask(taskId));
		})
		.finally(() =>
			dispatch(loading(TASK_OPERATIONS.DELETE, STATUS_OPERATIONS.FALSE)),
		);
};

export const updateTaskAsync = (taskId, taskCompleted) => (dispatch) => {
	dispatch(loading(TASK_OPERATIONS.UPDATE, STATUS_OPERATIONS.TRUE));
	fetch(`http://localhost:3000/tasks/${taskId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			complete: taskCompleted,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => {
			dispatch(updateTask(taskId, { complete: taskCompleted }));
		})
		.finally(() =>
			dispatch(loading(TASK_OPERATIONS.UPDATE, STATUS_OPERATIONS.FALSE)),
		);
};
