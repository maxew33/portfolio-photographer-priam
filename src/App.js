import React, { Component, Fragment} from 'react'
import './App.css'
import Carousel from './components/carousel'

class App extends Component{
  render() {
    return (
      <Fragment>
        <div className = "main-container">
          <Carousel />
          <div className="slide-transition"></div>
        </div>     
      </Fragment>
    )
  }
}

export default App
