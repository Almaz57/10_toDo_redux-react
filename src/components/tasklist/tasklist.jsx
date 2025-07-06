import styles from './tasklist.module.css';
import { Form } from '../index';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectFetchLoading, selectTasks } from '../../redux/selectors/taskSelectors.js';

export const TaskList = () => {
	const task = useSelector(selectTasks);
	const isLoading = useSelector(selectFetchLoading);

	return (
		<div className={styles.container}>
			<label className={styles.title}>
				{isLoading ? 'Загрузка...' : 'ToDo List'}
			</label>
			<Form />

			<div className={styles.todoTasksList}>
				{task.map((data) => (
					<Link
						to={`/tasks/${data.id}`}
						key={data.id}
						className={`${styles.link} ${data.complete ? styles.completed : ''}`}
					>
						{data.title}
					</Link>
				))}
			</div>
		</div>
	);
};
