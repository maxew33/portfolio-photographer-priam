import React from 'react'
import '../style/social.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFlickr } from '@fortawesome/free-brands-svg-icons'

const Social = () => {
    return(
        <div className = "social">
              <a href="https://www.flickr.com/people/lilbennyhill/" 
              target="_blank"
              rel="noopener" 
              className = "social__icon social__icon-flickr"
              >
                <FontAwesomeIcon icon={faFlickr} />
              </a>
              <a href="#"  
              target="_blank"
              rel="noopener" 
              className = "social__icon social__icon-instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
        </div>
    )
}

export default Social