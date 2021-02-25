import React from 'react'

const handleClick = (nom) =>{
    switch (nom){
        case 1 : 
        const titre = document.querySelector('.titre'),
        name = document.querySelector('.name'),
        showNavigation = document.getElementsByClassName('show__navigation')
    
        titre.classList.remove('titreToTop')
        name.classList.remove('nameToTop')    
        for ( const element of showNavigation){
            element.classList.remove('disappear')
        }
    
            break

        case 2 :
            console.log ('contact')
            break

        case 3 :
            console.log('about')
            break

        default : 
            console.log('pas d id passé')
    }
}

const MenuRubrique = ({ nomRubrique, click }) =>{
    return(
        <div className="menu-rubrique" onClick = {() => handleClick(click)}>
        { nomRubrique }
        </div>
    )
}

export default MenuRubrique