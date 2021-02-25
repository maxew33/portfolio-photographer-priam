import React from 'react'
import '../style/social.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faFlickr } from '@fortawesome/free-brands-svg-icons'

const Social = () => {
    return(
        <div className = "social">
              <a href="#" className = "social__icon social__icon-flickr">
                <FontAwesomeIcon icon={faFlickr} />
              </a>
              <a href="#" className = "social__icon social__icon-instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className = "social__icon social__icon-twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
        </div>
    )
}

export default Social