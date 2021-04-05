import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import{BrowserRouter as Router,Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
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
    <Router>
    <div className="App">
    <header className="App-header" style={{paddingTop:80}}>
    <Route path = '/cn' exact render = {(props)=>(
      <>
     
      <Link to='/' style={{padding: 5, marginBottom:15}}> 
      <Button style={{fontSize:20}} >English </Button>  </Link>
        <h1>💉全球CV-19疫苗接种进展 💉</h1>
        <p style={{color:'gray'}}>{date.getMonth()+1}.{date.getDate()} {date.getHours()}:{date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`} 更新</p>
        <p style={{}}>🌏{(globalTotal/100000000).toFixed(2)}
        亿剂</p>
        <hr></hr>
        <p>🇺🇸美国: 已接种{total}剂疫苗，人口占比{singlePercent.toFixed(2)}%；</p>
        <p style={{}}>🚨今日接种{(shotsToday/10000).toFixed(1)}万剂;</p>
        <p style={{}}>📈七日平均{(sevenDayAvg/10000).toFixed(1)}万剂⬆️；</p>
        <p style={{}}>📅按照当前平均速率，美国将在{7-(date.getMonth()+1)}个月内(今年7月) 完成对75%的人口接种并形成群体免疫。</p>
        <p style={{}}>🇨🇳中国: {(chinaTotal/100000000).toFixed(2)}亿剂；<span style={{color:'gray'}}>人口占比4.9%</span></p>
        <p style={{}}>🇪🇺欧盟: {(euTotal/10000).toFixed(2)}万剂；人口占比{(euPercent.toFixed(2))}%</p>
        <p style={{}}>🇬🇧英国: {(englandTotal/10000).toFixed(2)}万剂；人口占比{(englandPercent.toFixed(2))}%</p>

        
      </>
      )}
      />
       <Route path = '/' exact render = {(props)=>(
        <>
        
        <Link to='/cn' style={{padding: 5, marginBottom:15}}> 
      <Button style={{fontSize:20}} >中文 </Button>  </Link>
        <h1>💉Global CV-19 Vaccine Tracker 💉</h1>
        <p style={{color:'gray'}}>{date.getMonth()+1}.{date.getDate()} {date.getHours()}:{date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`} updated</p>
      
        <p style={{}}>🌏 <Button variant = 'success' href ='https://www.pharmaceutical-technology.com/covid-19-vaccination-tracker/' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
          {(globalTotal/1000000).toFixed(2)} M</Button>
          shots globally</p>
        <hr></hr>
        <p>🇺🇸US: 
        <Button variant = 'success' href ='https://covid.cdc.gov/covid-data-tracker/#vaccinations' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
          {total.toLocaleString()} 
          </Button>
          shots administered，{singlePercent.toFixed(2)}% POP；</p>
        <p>🇺🇸US: FULLY VACCINATED <Button variant = 'success' href ='https://covid.cdc.gov/covid-data-tracker/#vaccinations' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
          {fullyPercent.toFixed(2)}
          %</Button></p>
        <p style={{}}>🚨Today {(shotsToday/1000000).toFixed(1)} M shots administered</p>
        <p style={{}}>📈7-day average {(sevenDayAvg/1000000).toFixed(1)} M shots</p>
        <p style={{}}>📅Expected to hit vaccine herd immunity in {7-(date.getMonth()+1)} months(July)</p>
        <p style={{}}>🇨🇳China: 
        <Button variant = 'success' href ='http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
        {(chinaTotal/1000000).toFixed(2)} M
        </Button>
         shots, <span style={{color:'gray'}}>4.9%</span> vaccinated</p> 
        <p style={{}}>🇪🇺EU: 
        <Button variant = 'success' href ='https://qap.ecdc.europa.eu/public/extensions/COVID-19/vaccine-tracker.html#uptake-tab' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
          {(euTotal/1000000).toFixed(2)} M
          </Button>
            shots, {(euPercent.toFixed(2))}% vaccinated</p>
        <p style={{}}>🇬🇧UK: <Button variant = 'success' href ='https://coronavirus.data.gov.uk/details/vaccinations' style={{fontSize:30, padding:2,margin:5,position:'relative', bottom:5, left:0}}>
          {(englandTotal/1000000).toFixed(2)} M
          </Button>
            shots, {(englandPercent.toFixed(2))}% vaccinated</p>

        


      </>
      )}
      />
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
    </Router>
  );
}

export default App;
