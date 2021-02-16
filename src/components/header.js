import React from 'react'
import Burger from './burger'
import Social from './social'

const Header = () => {
    return(
        <div className = "header">
        <Burger />
        <h1>
          Benedict Priam
        </h1>
        <Social />
      </div>
    )
}

export default Header