import React from 'react'
import '../style/burger.css'
import Menu from './menu'

let menu = 'closed'

const handleClick = () => {
    console.log('click')
    const burger = document.getElementsByClassName('burger')
    const rubrique = document.getElementsByClassName('menu-rubrique')
        if (menu === 'closed'){
            burger[0].classList.add('burger-top')
            burger[1].classList.add('burger-middle')
            burger[2].classList.add('burger-bottom')
            for (const element of rubrique){
                element.classList.add('menu-rubrique-apparition')
            }
            menu = 'open'
        }
        else{
            burger[0].classList.remove('burger-top')
            burger[1].classList.remove('burger-middle')
            burger[2].classList.remove('burger-bottom')
            for (const element of rubrique){
                element.classList.remove('menu-rubrique-apparition')
            }
            menu = 'closed'
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