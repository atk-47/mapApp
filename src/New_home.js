import React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

// Create separate components for each page
const Hotels = () => <div>Hotels Page</div>;
const Restaurants = () => <div>Restaurants Page</div>;
const Hospital = () => <div>Hospital Page</div>;

const New_home = () => {
  return (
    <Router>
      <div>
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
    </Router>
  );
};

export default New_home;