import { useEffect, useRef, useState } from 'react';
import styles from './HowMany.module.scss';

interface WeekType {
	월: boolean;
	화: boolean;
	수: boolean;
	목: boolean;
	금: boolean;
}

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

const formatTime = (time: string) => {
	const [hours, minutes] = time.split(':').map(Number);
	return Number((hours + minutes / 60).toFixed(2));
};

const formatHours = (decimalTime: number) => {
	const hours = Math.floor(decimalTime);
	const minutes = Math.round((decimalTime - hours) * 60);
	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
};

function HowMany() {
	const [timeRange, setTimeRange] = useState({
		start: Number(localStorage.getItem('start')) || 9,
		end: Number(localStorage.getItem('end')) || 18,
	});
	const WEEKS: Array<string> = ['월', '화', '수', '목', '금'];
	const [activeDate, setActiveDate] = useState<WeekType>({
		월: true,
		화: true,
		수: true,
		목: true,
		금: true,
	});

	const passedDay = Object.values(activeDate)
		.slice(0, new Date().getDay() - 1 > 0 ? new Date().getDay() - 1 : 0)
		.filter((value) => value).length;

	const audioRef = useRef<HTMLAudioElement>(null);
	const [time, setTime] = useState(
		`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
	);
	const [method, setMethod] = useState('today');

	const handleTime = () => {
		const list = time.split(':');
		const passedTime = () => {
			
			if (activeDate[DAY_NAMES[new Date().getDay()] as keyof WeekType]) {
				if (Number(list[0]) >= timeRange.end) return 1;
				if (Number(list[0]) >= Math.floor(timeRange.start)) {
					return (
						(Number(list[0]) -
							timeRange.start +
							Number(list[1]) / 60 +
							Number(list[2]) / 3600) /
						(timeRange.end - timeRange.start)
					);
				}
			}
			
			return 0;
		};

		if (method === 'today') {
			return (Math.floor(passedTime() * 10000000) / 100000).toFixed(5);
		}

		return passedDay + (passedTime() >= 1 ? 1 : passedTime()) >
			Object.values(activeDate).filter((value) => value).length
			? Object.values(activeDate).filter((value) => value).length
			: (
					Math.floor((passedDay + passedTime()) * 10000000) /
					Object.values(activeDate).filter((value) => value).length /
					100000
			  ).toFixed(5);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(
				`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (time === '17:59:52' && audioRef.current) {
			audioRef.current.play();
		}
	}, [time]);


	return (
		<div className={styles.template}>
			<h1>집에 가고싶다</h1>
			<h2>{method === 'today' ? '오늘' : '이번주'} 얼마나 남았지..</h2>
			<div className={styles.method}>
				<label htmlFor='today'>
					<input
						id='today'
						type='radio'
						name='method'
						value='today'
						defaultChecked
						onClick={() => setMethod('today')}
					/>
					오늘
				</label>
				<label htmlFor='thisweek'>
					<input
						id='thisweek'
						type='radio'
						name='method'
						value='week'
						onClick={() => setMethod('week')}
					/>
					이번주
				</label>
			</div>

			<div className={styles.range}>
				<label htmlFor='start'>
					출근시간
					<input
						type='time'
						value={formatHours(timeRange.start)}
						onChange={(e) => {
							if (formatTime(e.target.value) > timeRange.end) {
								return alert('퇴근시간보다 빨리 출근할 수 없습니다.');
							 }
							localStorage.setItem('start', formatTime(e.target.value)+'');
							setTimeRange((prev) => ({
								...prev,
								start: formatTime(e.target.value),
							}));
						}}
					/>
				</label>
				<label htmlFor='end'>
					퇴근시간
					<input
						type='time'
						value={formatHours(timeRange.end)}
						onChange={(e) => {
							if (formatTime(e.target.value) < timeRange.start) { 
								return alert('출근시간보다 늦게 퇴근할 수 없습니다.');
							}
							localStorage.setItem('end', formatTime(e.target.value)+'');
							setTimeRange((prev) => ({
								...prev,
								end: formatTime(e.target.value),
							}));
						}}
					/>
				</label>
			</div>

			<div className={styles.weeks}>
				{WEEKS.map((value) => (
					<button
						className={`${styles['weeks-default']} ${
							activeDate[value as keyof WeekType] && styles['weeks-active']
						} `}
						key={value}
						type='button'
						onClick={() =>
							setActiveDate((prev) => ({
								...prev,
								[value]: !prev[value as keyof WeekType],
							}))
						}
					>
						{value}
					</button>
				))}
			</div>

			<audio src='/timeout.mp3' ref={audioRef}></audio>
			{Number(handleTime()) === 100 && (
				<div style={{ color: '#ff0000', fontSize: '20px', fontWeight: '600' }}>
					퇴근이다!
				</div>
			)}
			<div>{handleTime()}% 완료</div>
		</div>
	);
}

export default HowMany;
