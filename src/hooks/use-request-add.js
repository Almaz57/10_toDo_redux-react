// import { useState } from 'react';
// import { generateRandomTitle } from '../components/index';
// import { addTaskAsync } from '../redux/actions/taskActions';
// addTaskAsync;
// export const useRequestAdd = (setTaskList, taskText) => {
// 	const [isCreating, setIsCreating] = useState(false);

// 	// Если пустой ввод — генерируем заголовок
// 	taskText = taskText.trim() === '' ? generateRandomTitle() : taskText;

// 	const requestAdd = () => {
// 		setIsCreating(true);

// 		fetch('http://localhost:3000/tasks', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json;charset=utf-8' },
// 			body: JSON.stringify({
// 				id: Date.now(),
// 				title: taskText,
// 				complete: false,
// 			}),
// 		})
// 			.then((rawResponse) => rawResponse.json())
// 			.then((newTask) => {
// 				setTaskList((prevTasks) => [...prevTasks, newTask]);
// 			})
// 			.finally(() => setIsCreating(false));
// 	};

// 	return { requestAdd, isCreating };
// };
