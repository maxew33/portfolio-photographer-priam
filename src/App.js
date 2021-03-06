import React, { Component, Fragment} from 'react'
import './App.css'
import Carousel from './components/carousel'
import Header from './components/header'

class App extends Component{
  render() {
    return (
      <Fragment>
        <div className = "main-container">
          <Header />
          <Carousel />
        </div>     
      </Fragment>
    );
  }
}

export default App
