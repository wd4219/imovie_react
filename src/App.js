import React, { Component } from 'react';
import './App.css';
import Footer from './components/footer/Footer.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './container/Home/Home.js';
import Movie from './container/movie/Movie.js';
import Tv from './container/tv/Tv.js';
import My from './container/my/My.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movie" component={Movie}/>
            <Route path="/tv" component={Tv}/>
            <Route path="/my" component={My}/>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
