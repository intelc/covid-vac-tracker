import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
function App() {
  const [send,setSend]=useState(false)
  const [data,setData]=useState('default')
  useEffect(() => {
    const getData = async()=>{
      const dataFromServer = await pullData()
      const{date, vaccinated} = await dataFromServer
      console.log(vaccinated)
      setData(vaccinated)
    }
    getData()
    
  }, [])
  /*const sendRequest = async (date,vaccinated)=>{
    const res =await fetch('api/US/add',{method:'POST', 
    headers: {
      'Content-type':'application/json'
    },
    body:`{"date":"${date}","vaccinated":${vaccinated}}`
  }
    )
    console.log('sent')

  }*/
  const pullData = async ()=>{
    const res =await fetch('api/US/latest',{methods:'GET'})
    console.log('fetched')
    
    const returnedPromise= res.json()
    console.log(returnedPromise)
    return(returnedPromise)
  }
  const date = new Date()
  return (
    <div className="App">
      <header className="App-header">
        <p>💉全球CV-19疫苗接种进展 ({date.getMonth()+1}.{date.getDate()})💉</p>
        <p style={{color:'gray'}}>🌏4.50亿剂</p>
        <hr></hr>
        <p>🇺🇸美国: 已接种{data}剂疫苗，人口占比{(data/328200000*100*1.00).toFixed(2)}%；</p>
        <p style={{color:'gray'}}>🚨今日接种330万剂;</p>
        <p style={{color:'gray'}}>📈七日平均271万剂⬆️；</p>
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
