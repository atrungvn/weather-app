
import { useEffect, useState } from 'react';
import './App.css';
import API_KEY from './axios';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

let listIcon = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];


function App() {
  const [getState,setGetState] = useState();
  const [state,setState] = useState();
  const [temp,setTemp] = useState();
  const [status,setStatus] = useState();
  const [country,setCountry] = useState();
  const [ok,setOk] = useState(false);
  const [icon,setIcon] = useState();

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&units=metric&appid=${API_KEY}`;
  

  function handleInput(name) {
    setGetState(name);
  }

  function handleSearch (e) {
    e.preventDefault();
    setState(getState);
    console.log("search state: ", getState);
  }

  useEffect (() => {
    console.log(apiUrl);
    const getData = async () => {
        await axios.get(apiUrl).then(res => {
        setOk(true);
        
        const data = res.data;
        
        setState(data.name);
        setTemp(data.main.temp);
        setStatus(data.weather[0].main);
        setCountry(data.sys.country);
        
      }).catch (err => {
        setOk(false);
        console.log(err)
      });
    }
      getData();
    
  },[state])

  function Show () {
    let idx1 = (listIcon.findIndex((item) => item.type === status));
    const imgUrl = listIcon[idx1].img;

    return (
    <div className='main'>
      <div>{state}, {country}</div>
      
      <div ><img id="image" src={imgUrl} /></div>
      <div className='status'>{status}</div>
      <div className='temp'>{temp}&deg;C</div>
    </div>
    )
  }


  function ShowErr () {
    if (getState) {
      return <div>Not Found</div>
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={ (e) => {handleInput(e.target.value)}}
                  />
                  <Button variant="light" type="submit">Search</Button>
        </Form>

        
        <div>{ok? <Show /> : <ShowErr />}</div>
      </header>
    </div>
  );
}

export default App;
