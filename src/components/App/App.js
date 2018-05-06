import React, { Component } from 'react';
import { BrowserRouter, Route } from  'react-router-dom'
import Home from '../Home/Home'
import Detail from '../Detail/Detail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Home} exact></Route>
          <Route path="/book/:id" component={Detail} ></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
