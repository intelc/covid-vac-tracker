import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
function App() {
  const [send,setSend]=useState(false)
  
  const [date,setDate]=useState(new Date())
  const [total,setTotal]=useState(0)
  const [singlePercent,setSinglePercent]=useState(0)
  const [fullyPercent,setFullyPercent]=useState(0)
  const [sevenDayAvg,setSevenDayAvg]=useState(1)
  const [shotsToday,setShotsToday]=useState(1)

  useEffect(() => {
    const getData = async()=>{
      const dataFromServer = await pullData()
      const{date, total,singlePercent,fullyPercent,sevenDayAvg,shotsToday} = await dataFromServer
      console.log(date, total,singlePercent,fullyPercent,sevenDayAvg,shotsToday)
      
      setDate(new Date(date))
      setTotal(total)
      setSinglePercent(singlePercent)
      setFullyPercent(fullyPercent)
      setSevenDayAvg(sevenDayAvg)
      setShotsToday(shotsToday)
    }
    getData()
    
  }, [])
  
  const pullData = async ()=>{
    const res =await fetch('api/US/latest',{methods:'GET'})
    console.log('fetched')
    
    const returnedPromise= res.json()
    console.log(returnedPromise)
    return(returnedPromise)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>💉全球CV-19疫苗接种进展 ({date.getMonth()+1}.{date.getDate()} {date.getHours()}:00 更新)💉</p>
        <p style={{color:'gray'}}>🌏4.50亿剂</p>
        <hr></hr>
        <p>🇺🇸美国: 已接种{total}剂疫苗，人口占比{singlePercent.toFixed(2)}%；</p>
        <p style={{}}>🚨今日接种{(shotsToday/10000).toFixed(1)}万剂;</p>
        <p style={{}}>📈七日平均{(sevenDayAvg/10000).toFixed(1)}万剂⬆️；</p>
        <p style={{color:'gray'}}>📅按照当前平均速率，美国将在4个月内(今年7月) 完成对75%的人口接种并形成群体免疫。</p>
        <p style={{color:'gray'}}>🇨🇳中国: 1.03亿剂；人口占比3.6%</p>
        <p style={{color:'gray'}}>🇪🇺欧盟: 6772万剂；人口占比7.6%</p>
        <p style={{color:'gray'}}>🇮🇳印度: 6027万剂；人口占比2.2% </p>
        <p style={{color:'gray'}}>🇬🇧英国: 3368万剂；人口占比25.2%</p>


        
      </header>
    </div>
  );
}

export default App;
