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
      setData(vaccinated)
    }
    getData()
    
  }, [])
  const sendRequest = async (date,vaccinated)=>{
    const res =await fetch('/api/china/add',{method:'POST', 
    headers: {
      'Content-type':'application/json'
    },
    body:`{"date":"${date}","vaccinated":${vaccinated}}`
  }
    )
    console.log('sent')

  }
  const pullData = async ()=>{
    const res =await fetch('/api/china/latest',{methods:'GET'})
    console.log('fetched')
    
    const returnedPromise= res.json()
    //console.log(res.json())
    return(returnedPromise)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>💉全球CV-19疫苗接种进展 (03.28)💉</p>
        <p>🌏4.50亿剂(七日平均 ~1450万)</p>
        <hr></hr>
        <p>🇺🇸美国: 已接种{data}剂疫苗，人口占比{(data/328200000*100*1.00).toFixed(2)}%；</p>
        <p>🚨今日接种330万剂; </p>
        <p>📈七日平均271万剂⬆️；</p>
        <p>📅按照当前平均速率，美国将在4个月内(今年7月) 完成对75%的人口接种并形成群体免疫。</p>
        <hr></hr>
        <p>🇨🇳中国: 1.03亿剂；人口占比3.6%</p>
        <Button variant={!send?"primary":"success"} onClick={(e)=>{
          e.preventDefault()
          sendRequest('2021-2-13',20000)
          setSend(true)}}>{!send?`send test message`:`success`}</Button>
      </header>
    </div>
  );
}

export default App;
