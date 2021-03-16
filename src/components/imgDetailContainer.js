import React, { Component } from 'react'
import '../style/imgDetailContainer.css'
import {gallery} from './gallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const galeries = gallery,
galerie = galeries[0]

class ImgDetailContainer extends Component{ 

    state = {
        galerie
    }

    handleClick = () => {
        console.log('click on exit')
        document.querySelector('.slide-transition').style.left = '-100vw'
        setTimeout(function(){
            document.querySelector('.image__detail').style.left = '-100vw'
        }, 500); 
    }

    render ()  {  
        
        return(
            <div className="image__detail">
                <img
                    src="https://cdn.pixabay.com/photo/2018/04/09/15/09/play-3304309_960_720.jpg"
                    alt="img"
                    className="image__detail-img"/>
                <div className="image__detail-spec-container">
                    <div className="image__detail-spec image__detail-spec-nom-photographe">
                        Benedict Priam 
                        <br/>
                        {this.props.nomGalerie}
                    </div>
                    <div className="image__detail-spec image__detail-spec-nom-photo">
                        Nom de la photo
                    </div>
                    <div className="image__detail-spec image__detail-spec-date-et-lieu">
                        Prise le <span className="image__detail-spec-date"> date de la photo</span> à <span className="image__detail-spec-lieu"> date de la photo</span>.
                    </div>
                    <div className="image__detail-spec image__detail-spec-desc">
                        Description de la photo
                    </div>
                </div>
                <div className="exitcross"
                    onClick={ () => this.handleClick() }>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </div>
        )
    }

}

export default ImgDetailContainer

