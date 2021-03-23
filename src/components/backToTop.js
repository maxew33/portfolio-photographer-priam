import React, { Component} from 'react'
import '../style/backToTop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

class BackToTop extends Component {

    handleClick = () => {
        const showContainer = document.querySelector('.show__container')
        showContainer.scrollTo({top: 0, behavior: 'smooth'})
    }

    render(){
        return(
        <div className = "backToTop" >
            <div className = "backToTop-icon"
                onClick = { () => this.handleClick() }>
                <FontAwesomeIcon icon={faChevronUp} />
            </div>
        </div>
        )
    }
}

export default BackToTop