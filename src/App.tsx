import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({ week: 0, hour:0,minute:0})
  console.log('data:', data);

  const handleTime = () => {
    const time = (data.hour + data.minute / 60)/9;
    console.log('time:', time);
    const percentage = data.week + (time > 1 ? 1 : time);
    console.log('percentage:', percentage);
    return Math.round(percentage*2000)/100
  }
  console.log('handleTime:', handleTime());

  return (
    <>
      <div>
       
      </div>
      <h1>집에 가고싶다</h1>
      <select className='week' name="week" id="" onChange={(e)=>setData(prev=>({...prev,week:Number(e.target.value)}))}>
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
            <option value={index}>{index}분</option>
          )}
        </select>
      </div>     
      <div>{handleTime()}% 완료</div>
    </>
  )
}

export default App
