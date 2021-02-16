import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Social = () => {
    return(
        <div className = "social">
              <a href="#" className = "social__icon social__icon-flickr">
                <FontAwesomeIcon icon={faCamera} />
              </a>
              <a href="#" className = "social__icon social__icon-instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
        </div>
    )
}

export default Social