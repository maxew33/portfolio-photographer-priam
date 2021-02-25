import React, { Component, Fragment} from 'react'
import './App.css'
import Show from './components/show'
import Header from './components/header'

class App extends Component{
  render() {
    return (
      <Fragment>
        <div className = "main-container">
          <Header />
          <Show />
        </div>     
      </Fragment>
    );
  }
}

export default App
