import { useEffect, useState } from 'react';
import './App.css';
import BASE_URL_API from './axios';
import axios from 'axios';
import Quest from './Quest';


function App() {
  const [initQuest,setInitQuest] = useState([]);
  const [idx,setIdx] = useState(0);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${BASE_URL_API}`);
      if (data.data) {
        console.log(data.data);
        setInitQuest(data.data);
        setLoading(false);
      }
    }
    getData();
  }
  ,[])

  function handlenext (idx) {
    if (idx < (initQuest.length-1))
    setIdx(idx+1);
  }

  function handleprev (idx) {
    if (idx>0) {
      setIdx(idx-1);
    }
  }

  return (

    <div className="App">
      {loading? <>Loading...</> : <Quest data = {initQuest} idx={idx} nextqs={handlenext} prevqs={handleprev} />}   
    </div>
  );
}

export default App;
