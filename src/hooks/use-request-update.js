import { useState } from 'react';

export const useRequestUpdate = (setTaskList) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdate = (taskId, taskCompleted) => {
		setIsUpdating(true);
		fetch(`http://localhost:3000/tasks/${taskId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				complete: taskCompleted,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTask) => {
				setTaskList((prevTasks) =>
					prevTasks.map((task) =>
						task.id === updatedTask.id ? updatedTask : task,
					),
				);
			})
			.finally(() => setIsUpdating(false));
	};

	return { requestUpdate, isUpdating };
};
