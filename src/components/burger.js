import React from 'react'
import '../style/burger.css'
import Menu from './menu'

const handleClick = () => {
    console.log('click')
    const burger = document.getElementsByClassName('burger')
    const rubrique = document.getElementsByClassName('menu-rubrique')

        burger[0].classList.toggle('burger-top')
        burger[1].classList.toggle('burger-middle')
        burger[2].classList.toggle('burger-bottom')
        for (const element of rubrique){
            element.classList.toggle('menu-rubrique-apparition')
        }
}

const Burger = () => {
    return(
        <div className="menu">
            <div className = "burger-container" 
                onClick = { handleClick }
            >
                <div className = "burger"></div>
                <div className = "burger"></div>
                <div className = "burger"></div>
            </div>
            <Menu />
        </div>
    )
}

export default Burger