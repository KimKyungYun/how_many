import { useEffect, useRef, useState } from 'react';
import './App.css';

interface WeekType {
	월: boolean;
	화: boolean;
	수: boolean;
	목: boolean;
	금: boolean;
}

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
function App() {
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
				if (Number(list[0]) >= 18) return 1;
				if (Number(list[0]) >= 9) {
					return (
						(Number(list[0]) -
							9 +
							Number(list[1]) / 60 +
							Number(list[2]) / 3600) /
						9
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
					100000).toFixed(5);
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
		<>
			<div></div>
			<h1>집에 가고싶다</h1>
			<h2>{method === 'today' ? '오늘' : '이번주'} 얼마나 남았지..</h2>
			<div className='method'>
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

			<div className='weeks'>
				{WEEKS.map((value) => (
					<button
						className={`weeks-default ${
							activeDate[value as keyof WeekType] && 'weeks-active'
						}`}
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
		</>
	);
}

export default App;
