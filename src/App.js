import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
function App() {
  const [send,setSend]=useState(false)
  
  const [date,setDate]=useState(new Date())
  const [total,setTotal]=useState(0)
  const [singlePercent,setSinglePercent]=useState(0)
  const [fullyPercent,setFullyPercent]=useState(0)
  const [sevenDayAvg,setSevenDayAvg]=useState(1)
  const [shotsToday,setShotsToday]=useState(1)
  const [chinaTotal,setChinaTotal]=useState(1)
  const [euTotal,setEuTotal]=useState(1)
  const [euPercent,setEuPercent]=useState(1)
  const [englandTotal,setEnglandTotal]=useState(1)
  const [englandPercent,setEnglandPercent]=useState(1)
  const [globalTotal,setGlobalTotal]=useState(1)

  useEffect(() => {
    const getData = async()=>{
      const dataFromServer = await pullData()
      const{date,total,singlePercent,fullyPercent,sevenDayAvg,shotsToday,chinaTotal,
        euTotal,euPercent,englandTotal,englandPercent,globalTotal} = await dataFromServer
      console.log(date,total,singlePercent,fullyPercent,sevenDayAvg,shotsToday,chinaTotal,
        euTotal,euPercent,englandTotal,englandPercent,globalTotal)
      
      setDate(new Date(date))
      setTotal(total)
      setSinglePercent(singlePercent)
      setFullyPercent(fullyPercent)
      setSevenDayAvg(sevenDayAvg)
      setShotsToday(shotsToday)

      setChinaTotal(chinaTotal)
      setEuTotal(euTotal)
      setEuPercent(euPercent)
      setEnglandTotal(englandTotal)
      setEnglandPercent(englandPercent)
      setGlobalTotal(globalTotal)
      
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
      <header className="App-header" style={{paddingTop:100}}>
        <h1>💉全球CV-19疫苗接种进展 ({date.getMonth()+1}.{date.getDate()} {date.getHours()}:{date.getMinutes()} 更新)💉</h1>
        <p style={{}}>🌏{(globalTotal/100000000).toFixed(2)}
        亿剂</p>
        <hr></hr>
        <p>🇺🇸美国: 已接种{total}剂疫苗，人口占比{singlePercent.toFixed(2)}%；</p>
        <p style={{}}>🚨今日接种{(shotsToday/10000).toFixed(1)}万剂;</p>
        <p style={{}}>📈七日平均{(sevenDayAvg/10000).toFixed(1)}万剂⬆️；</p>
        <p style={{}}>📅按照当前平均速率，美国将在3个月内(今年7月) 完成对75%的人口接种并形成群体免疫。</p>
        <p style={{}}>🇨🇳中国: {(chinaTotal/100000000).toFixed(2)}亿剂；<span style={{color:'gray'}}>人口占比3.6%</span></p>
        <p style={{}}>🇪🇺欧盟: {(euTotal/10000).toFixed(2)}万剂；人口占比{(euPercent.toFixed(2))}%</p>
        <p style={{}}>🇬🇧英国: {(englandTotal/10000).toFixed(2)}万剂；人口占比{(englandPercent.toFixed(2))}%</p>

        <div className="selfCenter standardWidth">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="CDCgov"
            options={{height: 600}}
            
          />
        </div>
        
      </header>
      <footer> Intel Chen & Cormac Lee 2021</footer>
    </div>
  );
}

export default App;
