import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';

export default function DefaultLayout() {
	const { pathname } = useLocation();
	return (
		<div className={styles.template}>
			<div className={styles.nav}>
				<Link
					className={`${styles.nav__link} ${
						pathname === '/' && styles['nav__link--active']
					}`}
					to='/'
				>
					퇴근 계산기
				</Link>
				{/* <Link
					className={`${styles.nav__link} ${
						pathname === '/roulette' && styles['nav__link--active']
					}`}
					to='/roulette'
				>
					룰렛돌리기
				</Link> */}
			</div>
			<Outlet />
		</div>
	);
}
