import styles from './task.module.css';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectDeleteLoading,
	selectFetchLoading,
	selectTasks,
	selectUpdateLoading,
} from '../../redux/selectors/taskSelectors.js';
import { deleteTaskAsync, updateTaskAsync } from '../../redux/actions/taskActions.js';

export const Task = () => {
	const tasks = useSelector(selectTasks);
	const isUpdating = useSelector(selectUpdateLoading);
	const isDeleting = useSelector(selectDeleteLoading);
	const isLoading = useSelector(selectFetchLoading);
	const dispatch = useDispatch();

	const navigate = useNavigate(); // для программной навигации
	const { id } = useParams(); // id из URL

	// Пока данные загружаются — показываем "Загрузка..."
	if (tasks.length === 0 || isLoading) {
		return <p>Загрузка...</p>;
	}
	const task = tasks.find((t) => String(t.id) === id);

	//Если задача не найдена — перенаправляем на 404
	if (!task) {
		return <Navigate to="/404" replace />;
	}

	return (
		<>
			<button className={styles.homeBtn} onClick={() => navigate('/')}>
				На главную
			</button>

			<div className={styles.todoTask}>
				<input
					className={styles.checkbox}
					type="checkbox"
					checked={task.complete}
					disabled={isUpdating}
					onChange={() => dispatch(updateTaskAsync(task.id, !task.complete))}
				></input>
				<label className={styles.label}>{task.title}</label>
				<button
					className={styles.delBtn}
					onClick={() => {
						dispatch(deleteTaskAsync(task.id));
						navigate('/');
					}}
					disabled={isDeleting}
				>
					Delete
				</button>
			</div>
		</>
	);
};

// {
//   "tasks": [
//     { "id": 1750149710767, "title": "",      "complete": true  },
//     { "id": 1750149718228, "title": "wewqe", "complete": false },
//   ]
// }
