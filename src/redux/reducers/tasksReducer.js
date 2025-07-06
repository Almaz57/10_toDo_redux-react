export const taskReduceTypes = {
	SET_TASKS: 'SET_TASKS',
	ADD_TASK: 'ADD_TASK',
	DELETE_TASK: 'DELETE_TASK',
	UPDATE_TASK: 'UPDATE_TASK',
	SET_LOADING: 'SET_LOADING',
};

export const TASK_OPERATIONS = {
	ADD: 'add',
	DELETE: 'delete',
	UPDATE: 'update',
	FETCH: 'fetch',
};

export const STATUS_OPERATIONS = {
	TRUE: true,
	FALSE: false,
};

const initialState = {
	tasks: [],
	loading: {
		add: false,
		delete: false,
		update: false,
		fetch: false,
	},
};

export const taskReduce = (state = initialState, action) => {
	switch (action.type) {
		// Установка списка задач
		case taskReduceTypes.SET_TASKS:
			return { ...state, tasks: action.payload };

		// Добавление задачи
		case taskReduceTypes.ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};

		// Удаление задачи
		case taskReduceTypes.DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};

		// Обновление задачи
		case taskReduceTypes.UPDATE_TASK:
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, ...action.payload.changes }
						: task,
				),
			};

		// Управление флагами загрузки
		case taskReduceTypes.SET_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					[action.payload.operation]: action.payload.status,
				},
			};

		default:
			return state;
	}
};
