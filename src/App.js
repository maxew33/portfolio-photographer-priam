import React, { Component, Fragment} from 'react'
import { Helmet } from 'react-helmet'

import './App.css'

import Carousel from './components/carousel'
import Favicon from'./favicon/favicon.png'

class App extends Component{
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Benedict Priam - photographe</title>

          <meta name="author" content="Maxime Malfilâtre"/>
          <meta name="description" content="portfolio Benedict Priam" />
          <link rel="icon" type="image/png" href={ Favicon } sizes="16x16" />

        </Helmet>
        <div className = "main-container">
          <Carousel />
          <div className="slide-transition"></div>
        </div>     
      </Fragment>
    )
  }
}

export default App
