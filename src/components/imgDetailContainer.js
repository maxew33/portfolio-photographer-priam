import React, { Component } from 'react'
import '../style/imgDetailContainer.css'
import { gallery } from './gallery'
import ImgNavigationArrow from './imgNavigationArrow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class ImgDetailContainer extends Component{ 

    state = {
        rank: this.props.rank
    }

    handleClick = (rank) => {
        document.querySelector('.slide-transition').style.left = '-100vw'
        setTimeout(function(){
            document.querySelector('.image__detail').style.left = '-100vw'
        }, 500); 
    }

    handleClickArrow = (value) => {
        console.log('click')
        console.log('value : ' + value)
        console.log(this.props.galerie.img.length)
        let rank = this.state.rank
        let idRank = rank
        idRank += value
        if(idRank < 0){idRank = this.props.galerie.img.length - 1}
        if(idRank === this.props.galerie.img.length){ idRank = 0 }
        
        rank = idRank
        console.log('new rank : ' + rank)
        this.setState({ rank })
    }

    render ()  {  

        const { rank } = this.state
        
        return(
            <div className="image__detail">
                <div className="image__detail-img-container">
                    <ImgNavigationArrow 
                        direction='left' 
                        chgt = { () => this.handleClickArrow(-1)}/>
                    <img
                        src={ this.props.galerie.img[rank].src }
                        alt={ this.props.galerie.img[rank].name }
                        className="image__detail-img"/>
                    <ImgNavigationArrow 
                        direction='right' 
                        chgt = { () => this.handleClickArrow(1)}/>
                </div>

                <div className="image__detail-spec-container">
                    <div className="image__detail-spec image__detail-spec-nom-photographe">
                        Benedict Priam 
                        <br/>
                        - {this.props.galerie.name} - 
                    </div>
                    <div className="image__detail-spec image__detail-spec-nom-photo">
                        Nom de la photo : { this.props.galerie.img[rank].name } - ( {rank+1} / { this.props.galerie.img.length } )
                    </div>
                    <div className="image__detail-spec image__detail-spec-date-et-lieu">
                        Prise le <span className="image__detail-spec-date"> { this.props.galerie.img[rank].date } </span> à <span className="image__detail-spec-lieu"> { this.props.galerie.img[rank].lieu } </span>.
                    </div>
                    <div className="image__detail-spec image__detail-spec-desc">
                        { this.props.galerie.img[rank].description }
                    </div>
                </div>
            </div>
        )
    }

}

export default ImgDetailContainer

