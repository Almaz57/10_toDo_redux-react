import { useState } from 'react';

export const useRequestDelete = (setTaskList) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = (taskId) => {
		setIsDeleting(true);

		fetch(`http://localhost:3000/tasks/${taskId}`, {
			method: 'DELETE',
		})
			.then(() => {
				setTaskList((prevTasks) =>
					prevTasks.filter((task) => task.id !== taskId),
				);
			})
			.finally(() => setIsDeleting(false));
	};

	return { requestDelete, isDeleting };
};
