import styles from './notFound.module.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate(); // для программной навигации
	return (
		<div className={styles.err404}>
			<p className={styles.p}>Страница не найдена</p>
			<button className={styles.homeBtn} onClick={() => navigate('/')}>
				На главную
			</button>
		</div>
	);
};
