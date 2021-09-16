// import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Search from "./components/search"

const api  = {
  key: 'c53d07090596c4b22fd92015cd6a8ced',
  base : "https://api.openweathermap.org/data/2.5"
}

// const search = () => {
//   fetch (`${api.base}/weather?q=Kharkiv&appid=${api.key}&units=metric`)
//   .then(res => res.json())
//   .then(res => console.log(res))
// }

class App extends React.Component {
  gettingWeather = async (e) => {
    const city = e.target.value
    const apiUrl = await
    fetch (`${api.base}/weather?q=${city}&appid=${api.key}&units=metric`);
    const data = await apiUrl.json();
    console.log(data)
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/search">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/search">
              <Search weatherMethod={this.gettingWeather} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;

function About() {
  return (
    <div>
      About
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}
