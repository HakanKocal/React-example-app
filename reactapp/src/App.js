import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';

export default function App() {
  const [formula,setformula]=useState([]);
  const [search, setsearch] = useState('')
  const [adduser, setadduser] = useState([])
  // const [dinfo, setdinfo] = useState({driverId:null,givenName:null,nationality:null})
  const [driverIdvalue, setdriverIdvalue] = useState(true)
  const [givenNamevalue, setgivenNamevalue] = useState(true)
  const [nationalityvalue, setnationalityvalue] = useState(true)

  useEffect(() => {
    axios.get('https://ergast.com/api/f1/drivers.json')
    .then(res => {setformula(res.data.MRData.DriverTable.Drivers)})
  
   


},[]);



const removePeople=(e)=>
{
let filteredArray=formula.filter((x,i) => i!==e)
setformula(filteredArray);
}

  return(
    <div className="App">
      <h1>F1 PILOT</h1>
      <input type="text" placeholder="search driverId" className="search" onChange={x=>setsearch(x.target.value)}></input>
      <table>
     <thead>
     <tr>
    <th><button  onClick={x=>{
      if(driverIdvalue==true)
      {
      setformula([...formula.sort((a,b)=> a.driverId.toLowerCase()<b.driverId.toLowerCase()?1:-1)])
      setdriverIdvalue(false)
      }
      else
      {
        setformula([...formula.sort((a,b)=> a.driverId.toLowerCase()<b.driverId.toLowerCase()?-1:1)])
      setdriverIdvalue(true)
      }


    }} className="button">DriverId</button></th>
    <th><button  onClick={x=>{
      if(givenNamevalue==true)
      { 
        setformula([...formula.sort((a,b)=> a.givenName.toLowerCase()<b.givenName.toLowerCase()?1:-1)])
        setgivenNamevalue(false)
      }
      else
      {
        setformula([...formula.sort((a,b)=> a.givenName.toLowerCase()<b.givenName.toLowerCase()?-1:1)])
        setgivenNamevalue(true)
      }
     
    }} className="button">GivenName</button></th>
    <th><button  onClick={x=>{
      if(nationalityvalue==true)
      {
        setformula([...formula.sort((a,b)=> a.nationality.toLowerCase()<b.nationality.toLowerCase()?1:-1)])
        setnationalityvalue(false)
      }
      else
      {
        setformula([...formula.sort((a,b)=> a.nationality.toLowerCase()<b.nationality.toLowerCase()?-1:1)])
        setnationalityvalue(true)
      }
      
    }}className="button">Nationality</button></th>
    <th >Delete</th>
  </tr>
     </thead>
     <tbody>
      {formula.filter(x=>x.driverId.includes(search)).map((x,i)=>(
  <tr key={i}>
    <td>{x.driverId}</td>
      <td>{x.givenName}</td>
      <td>{x.nationality}</td>
      <td className="delete" onClick={x=> removePeople(i)}>X</td>
      <td onClick={y=>setadduser({
      ...adduser,
       driverId:x.driverId,
       givenName:x.givenName,
       nationality:x.nationality,
       })}>Düzenle</td> </tr>))}

  </tbody></table>
  <h1>ADD USER OR CHANGE</h1>
  <div className="userform">
  <input type="text" placeholder="DriverID" value={adduser.driverId} className="user" onChange={x=>setadduser({
    ...adduser,
    driverId:x.target.value
    
  })}></input>
   <input type="text" placeholder="givenNAME" value={adduser.givenName} className="user" onChange={x=>setadduser({
     ...adduser,
     givenName:x.target.value
   })}></input>
  <input type="text" placeholder="Nationality" value={adduser.nationality} class="user" onChange={x=>setadduser({
    ...adduser,
    nationality:x.target.value
  })}></input> 
  <input type="submit" className="user button" value="Add or Change" onClick={x =>{
    let result=formula.find(element=>element.driverId==adduser.driverId)
    if(!result)
    {
      setformula([
        ...formula,
        adduser])
    }
    else
    {
      setformula([...formula].map(x=>{
        if(x.driverId==adduser.driverId){
          return {
            ...x,
            driverId:adduser.driverId,
            givenName:adduser.givenName,
            nationality:adduser.nationality
          }

        }
        return x
      }))
    }





  }}></input>
  </div>
  
  </div>
  );
}

