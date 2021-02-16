import React, { Component, Fragment} from 'react'
import './App.css'
import Header from './components/header'
import bruit from './img/bruit.png'

class App extends Component{
  render() {
    return (
      <Fragment>
        {/* <div className = "mouchetage">
          <img src={bruit} alt="" />
        </div> */}
        <div className = "main-container">
          <Header />
        </div>     
      </Fragment>
    );
  }
}

export default App
