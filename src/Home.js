import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Button from './button';
import './filee.css'
 
 
 
class Home extends React.Component {
  // Function to send data to the Flask backend
  handleButtonClick = (buttonName) => {
    fetch('http://127.0.0.1:5000//receive_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ button: buttonName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
 
  render() {
    return (
      <div>
        {/* <button onClick={() => this.sendData('Button 1')}>Button 1</button>
        <button onClick={() => this.sendData('Button 2')}>Button 2</button>
        <button onClick={() => this.sendData('Button 3')}>Button 3</button> */}
        <Button label="Restaurants"  onClick={() => this.handleButtonClick("Restaurants")} />
        <Button label="Hotels" onClick={() => this.handleButtonClick("Hotels")} />
        <Button label="Hospitals" onClick={() => this.handleButtonClick("Hospitals")} />
      </div>
    );
  }
}
 
export default Home;