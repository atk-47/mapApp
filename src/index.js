import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Link,useNavigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
//import NewHome2 from './NewHome2';
import reportWebVitals from './reportWebVitals';
//import Routes from './routes';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  // <Router>
  //     <Route path = "/" component = {App}>
  //        {/* < component = {Home} /> */}
  //        <Route path = "home" component = {Home} />
  //        <Route path = "app" component = {App} />
  //     </Route>
  //  </Router>

  // <Router>
  //       {/* <div className="App"> */}
  //           <Routes />
  //       {/* </div> */}
  //   </Router>,


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
