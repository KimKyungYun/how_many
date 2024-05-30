import { useEffect,  useRef,  useState } from 'react'
import './App.css'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
  const [method, setMethod] = useState('today');
  console.log('time:', time);

  const handleTime = () => {
    const list = time.split(':');
    const passedTIme =(Number(list[0]) - 9)>=0? ((Number(list[0]) - 9) + ((Number(list[1])) / 60) + ((Number(list[2])) / 3600)) / 9:0;
    
    if (method === 'today') return passedTIme>1?100:(Math.floor(passedTIme * 10000000) / 100000).toFixed(5);
    return (new Date().getDay() - 1 + passedTIme) > 5 ? 5 : (Math.floor((new Date().getDay() - 1 + passedTIme) * 2000000) / 100000).toFixed(5);
  }
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
    }, 1000);

    return () => clearInterval(interval);
  }, [])
  
  
  useEffect(() => {
    if (time === '17:46:52'&&audioRef.current) {
      
      audioRef.current.play()
    }
  }, [time])
  
  return (
    <>
      <div>
       
      </div>
      <h1>집에 가고싶다</h1>
      <h2>{method === 'today' ? '오늘' : '이번주'} 얼마나 남았지..</h2>
      <div className='method'>
        <label htmlFor="today">
          <input id='today' type="radio" name='method' value='today' defaultChecked onClick={() => setMethod('today')} />
          오늘
        </label>
        <label htmlFor="thisweek">
          <input id='thisweek' type="radio" name='method' value='week' onClick={() => setMethod('week')} />
          이번주
        </label>
      </div>
      {/* <select className='week' name="week" id="" disabled={method==='today'} onChange={(e)=>setData(prev=>({...prev,week:Number(e.target.value)}))}>
        <option value={0}>월</option>
        <option value={1}>화</option>
        <option value={2}>수</option>
        <option value={3}>목</option>
        <option value={4}>금</option>
      </select>

      <div className='time'>
        <select name="hour" id="" value={data.hour} onChange={(e) => {
          if (e.target.value === '9')            setData(prev => ({ ...prev, hour: Number(e.target.value),minute:0 }))
          setData(prev => ({ ...prev, hour: Number(e.target.value) }))
        }}>
          {Array.from({ length: 10 }).map((_, index) =>
            <option key={index} value={index}>{index+9}시</option>
          )}
        </select>
        <select name="minute" id="" value={data.minute} onChange={(e)=>setData(prev=>({...prev,minute:Number(e.target.value)}))}>
          {Array.from({ length: 60 }).map((_, index) =>
            <option key={index} value={index}>{index}분</option>
          )}
        </select>
      </div>      */}
      <audio src="/timeout.mp3" ref={audioRef} ></audio>
      {Number(handleTime())>100&&<div style={{ color: '#ff0000', fontSize: '20px', fontWeight: '600' }}>초과근무</div>}
      <div>{handleTime()}% 완료</div>
    </>
  )
}

export default App
