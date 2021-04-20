import React, { Fragment } from 'react'

const $ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document)

const handleClick = (nom) =>{
    switch (nom){
        case 1 : 
        window.location.reload()
        // const titre = document.querySelector('.titre'),
        // name = document.querySelector('.name'),
        // showNavigation = document.getElementsByClassName('show__navigation'),
        // mainPictureContainer = document.querySelector('.show__pictures'),
        // mainPicture = document.querySelector('.show__pictures-img')

        // mainPictureContainer.classList.remove('show__pictures-disappear')
        // mainPicture.classList.remove('show__pictures-img-shown')    
        // titre.classList.remove('titreToTop')
        // name.classList.remove('nameToTop')    
        // for ( const element of showNavigation){
        //     element.classList.remove('disappear')
        // }    
            break

        case 2 :
            $('.slide-transition').style.left = '100vw'
            console.log('contact')
            break

        case 3 :
            console.log('about')
            $('.slide-transition').style.left = '100vw'
            setTimeout(function(){
                $('.about').style.display = 'flex'
                $('.exitcross').style.opacity = '1'
            }, 500)
            break

        default : 
            console.log('pas d id passé')
    }
}

const MenuRubrique = ({ nomRubrique, click }) =>{
    return(
        <Fragment>
            <div className="menu-rubrique" onClick = {() => handleClick(click)}>
            { nomRubrique }
            </div>
        </Fragment>

    )
}

export default MenuRubrique