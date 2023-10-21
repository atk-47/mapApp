import React from 'react';
import { BrowserRouter as Routes, Link, Route} from 'react-router-dom';

// Create separate components for each page
const Hotels = () => <div>Hotels Page</div>;
const Restaurants = () => <div>Restaurants Page</div>;
const Hospital = () => <div>Hospital Page</div>;

const NewHome2 = () => {
  return (
    <Routes>
      <div>
      <title>Button Links</title>
        <nav>
          <ul>
            <li>
              <Link to="/hotels">Hotels</Link>
            </li>
            <li>
              <Link to="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/hospital">Hospital</Link>
            </li>
          </ul>
        </nav>
        <body>
            <a href="hotels.html" class="button">Hotels</a>
            <a href="restaurants.html" class="button">Restaurants</a>
            <a href="hospital.html" class="button">Hospital</a>
        </body>

          <Route path="/hotels">
            <Hotels />
          </Route>
          <Route path="/restaurants">
            <Restaurants />
          </Route>
          <Route path="/hospital">
            <Hospital />
          </Route>
      </div>
    </Routes>
  );
};

export default NewHome2;