import React, {useEffect, useState } from 'react';
import './App.css';
import './style.css';
import './card.css';
import Map from './components/Map';
import axios from 'axios';
import Maps from './components/Maps';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import { MovieForm } from "./input";
import { Container } from "semantic-ui-react";


const apikey = 'hkOwg_vp1p9zdrZsUZgAi6w7KG6NDz_WMvoy5CoBgXo';

const userPosition = { lat: 17.5449, lng: 78.5718 };

const restaurantList = [
  {
    name: "Punjabi Haveli",
    location: { lat: 17.57242794740273, lng: 78.5594516901389 },
    //17.57242794740273, 78.5594516901389
  },
  {
    name: "Tandoor",
    location: { lat: 17.573513857530074, lng: 78.56649902155148 },
    //17.573513857530074, 78.56649902155148
  },
  {
    name: "Alankrita",
    location: { lat: 64.1475, lng: -21.9347 },
  },
  {
    name: "Leonia Restaurant",
    location: { lat: 64.1494, lng: -21.9337 },
  },
];


  function RestaurantEntry(props) {
    const handleClick = () => {
      props.onClickHandler(props.data.location);
    };
    // Add basic styling for each restaurant entry
    const entryStyle = {
      display: "inline-block",
      margin: "5px",
      cursor: "pointer",
    };
 
    return (
      <div style={entryStyle} className='mb-1' onClick={handleClick}>
      
      <Card >
      <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>
         {props.data.address}
        </Card.Text>

      </Card>
      </div>
    );
  }

  function RestaurantList(props) {
    const entries = props.list;
    const list = entries.map((entry) => {
      return <RestaurantEntry data={entry} onClickHandler={props.onClickHandler} key={Math.random()}></RestaurantEntry>
    });
    return (
      <div id="restaurant-list" style={ {'display': 'grid'} } >
     <Card className='bg-secondary text-light'>{list}</Card>
      </div>
    )
  }
 

  function App() {
    const [restaurantPosition, setRestaurantPosition] = useState(null);
 
    const onClickHandler_ = (location) => {
      setRestaurantPosition(location);
    };

    const [data, setData] = useState([]);
    const [length,setLength] = useState(0);
    const [origin,setOrigin] = useState({'lat':17.45625938070448,'lng':78.51010721837149});

    useEffect(() => {
      const getData= async ()=>{
        try {
          const resp= await  fetch('http://127.0.0.1:5000/api/data');
          const resp2= await resp.json()
          const resp3= await  fetch('http://127.0.0.1:5000/api/origin');
          const resp4= await resp3.json()
          console.log(resp2)
          setData(resp2)
          setLength(resp2.length);
          setOrigin(resp4)
          console.log(resp4)


        } catch (error) {
          console.log("bad manners", error.message)
        }
      }
      getData();
      
      // Make a GET request to the Flask API endpoint
      // axios.get('http://localhost:5000/api/data')
      //   .then(response => {
      //     setData(response.data.message);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching data:', error);
      //   });
    }, []);
    // useEffect(() => {
    //   // Fetch JSON data from the local server
    //   fetch('http://127.0.0.1:5000/api/data')
    //     .then(response => response.json())
    //     .then(jsonData => {
    //       setData(jsonData);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching JSON data:', error);
    //     });
    // }, []);
  
 
    return (
      <div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
        <RestaurantList list={data} onClickHandler={onClickHandler_} />
        {console.log(origin)}
        <Container style={{ marginTop: 40 }}>
        <MovieForm
        />
        </Container>
          <Map
            apikey={apikey}
            userPosition={origin}
            restaurantPosition={restaurantPosition}
            data={data}
            length={length}
          />
         
          {console.log(data)}
        </div>
    );
  } 

export default App;
