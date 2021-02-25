import React, {Component} from 'react'
import '../style/show.css'

const galeries = [
    {id: 1,
    src: 'https://cdn.pixabay.com/photo/2018/04/09/15/09/play-3304309_960_720.jpg',
    name: 'Musique',
    color: 'rgb(29, 68, 84)'
    },
    {id: 2,
    src: 'https://cdn.pixabay.com/photo/2015/07/10/17/54/water-839886_960_720.jpg',
    name: 'Océan',
    color: 'rgb(207, 216, 214)'
    },
    {id: 3,
    src: 'https://cdn.pixabay.com/photo/2014/12/15/17/16/night-sky-569319_960_720.jpg',
    name: 'De nuit',
    color: 'rgb(14, 34, 78)'
    }
]

const galerie = {
    id: 1,
    src: 'https://cdn.pixabay.com/photo/2018/04/09/15/09/play-3304309_960_720.jpg',
    name: 'Musique',
    color: 'rgb(29, 68, 84)'
}

const handleClickPhoto = () => {
    console.log('photo')
    const titre = document.querySelector('.titre'),
    name = document.querySelector('.name'),
    showNavigation = document.getElementsByClassName('show__navigation')

    titre.classList.add('titreToTop')
    name.classList.add('nameToTop')
    for ( const element of showNavigation){
        element.classList.add('disappear')
    }
}

const handleLoad = () => {
    console.log('loaded')
    const corps = document.getElementsByTagName('body')
    console.log(corps)
    document.body.style.backgroundColor = 'red'
    
}

console.log(galerie.src)

let idGalerie = 0

class Show extends Component {

    state = {
        galerie
    }

    handleClick = (value) => {
        const galerie = { ...this.state.galerie }

        idGalerie += value
        if(idGalerie < 0){idGalerie = galeries.length - 1}
        if(idGalerie === galeries.length){idGalerie = 0}
        
        galerie.name = galeries[idGalerie].name
        galerie.src = galeries[idGalerie].src
        galerie.color = galeries[idGalerie].color
        this.setState({ galerie })        
    }

    handleLoad = (color) => {
        document.body.style.backgroundColor = color
    }

    render(){
        const { galerie } = this.state

        return(
            <div className="show__container">
                <div className="show__navigation show__navigation-left" 
                    onClick = { () => this.handleClick(-1) }>
                    <div className="show__navigation-arrow show__navigation-arrow-left">
                        <div className="show__navigation-arrow-pointe show__navigation-arrow-pointe-left"></div>
                        <div className="show__navigation-arrow-pointe show__navigation-arrow-pointe-left"></div>
                    </div>
                </div>
                    <img 
                    className="show__pictures" 
                    onClick={ handleClickPhoto } 
                    src={galerie.src} 
                    alt={galerie.name}
                    onLoad= { () => this.handleLoad(galerie.color) }
                    />
                <div className="show__navigation show__navigation-right" 
                    onClick = { () => this.handleClick(1) }>
                    <div className="show__navigation-arrow show__navigation-arrow-right">
                        <div className="show__navigation-arrow-pointe show__navigation-arrow-pointe-right"></div>
                        <div className="show__navigation-arrow-pointe show__navigation-arrow-pointe-right"></div>
                    </div>
                </div>
                <h2 className="titre">
                    {galerie.name}
                </h2>
            </div>
        )
    }
}




export default Show