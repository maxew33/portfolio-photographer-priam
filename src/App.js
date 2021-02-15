import React, { Component, Fragment} from 'react'
import './App.css'
import bruit from './img/bruit.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

class App extends Component{
  render() {
    return (
      <Fragment>
        {/* <div className = "mouchetage">
          <img src={bruit} alt="" />
        </div> */}
        <div className = "main-container">
          <div className = "header">
            <div className = "burger-container">
              <div className = "burger"></div>
              <div className = "burger"></div>
              <div className = "burger"></div>
            </div>
            <h1>
              Benedict Priam
            </h1>
            <div className = "social">
              <a href="#" className = "social__icon social__icon-flickr">
                <FontAwesomeIcon icon={faCamera} />
              </a>
              <a href="#" className = "social__icon social__icon-instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
          
      </Fragment>
    );
  }
}

export default App
