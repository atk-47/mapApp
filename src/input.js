import React, { useState } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";
 
 
// handleButtonClick = (buttonName) => {
//     fetch('http://127.0.0.1:5000//receive_data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ button: buttonName }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };
 
 
export const MovieForm = ({ onNewMovie }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("Restaurants");
 
 
 
  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="Enter Location"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Rating
          icon="star"
          rating={rating}
          maxRating={5}
          onRate={(_, data) => {
            setRating(data.rating);
          }}
        />
      </Form.Field>
      <Form.Field>
      {/* <Button label="Restaurants"  onClick={() => this.handleButtonClick("Restaurants")} /> */}
        <Button
          onClick={async () => {
            const movie = { title, type:"Restaurants" };
            const response = await fetch('http://127.0.0.1:5000//receive_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movie}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }}
            
        >
          Restaurants
        </Button>
        <Button
          onClick={async () => {
            const movie = { title, type:"Hotels" };
            const response = await fetch('http://127.0.0.1:5000//receive_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movie}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }}
            
        >
          Hotels
        </Button>
        <Button
          onClick={async () => {
            const movie = { title, type:"Hospitals" };
            const response = await fetch('http://127.0.0.1:5000//receive_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movie}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }}
        >
          Hospitals
        </Button>
      </Form.Field>
    
 
    </Form>
  );
};