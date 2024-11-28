import React, { useEffect, useState } from 'react';
import './component.css';
const RandomUser = () => {
  const [ detail , setDetail ]  = useState([]) ;
  const [ count , setCount ] = useState(0);
  const [ limit , setLimit ] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      if(count < limit) {
        const response = await fetch('https://randomuser.me/api?page=2');
        const data = await response.json();
        setDetail((prevdata)=>[
        ...prevdata,
        {
        key:data.results[0].login.uuid,
        name:data.results[0].name.first +" "+ data.results[0].name.last,
        picture:data.results[0].picture.large,
        },
        ]);
        setCount((prevCount) => prevCount + 1);
        
    } 
  };
  fetchData();
}, [count,limit]);

  const isfetch = ()=>{
    setLimit((prevlimit)=>prevlimit+10);
  }
  return (  
    <>
    <div>
        <h1>Random Users</h1>
    </div>
    <div className="layout">
    {detail.map((user) => (
        <div className='user' key={user.key}>
          <img src={user.picture} alt={user.name} />
          <p>{user.name}</p>
        </div>
     )) }
    </div>
    <button className='amu-button 'onClick={isfetch} >Add More User</button>
    </>
  )
}

export default RandomUser;