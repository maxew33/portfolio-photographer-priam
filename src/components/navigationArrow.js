import React from 'react'
import '../style/navigationArrow.css'

const NavigationArrow = ({ direction, chgt }) => {

    return(
        <div 
        className={`navigation navigation-${ direction }`}
        onClick={chgt}>
            <div className={`navigation-arrow navigation-arrow-${ direction }`}>
                <div className={`navigation-arrow-pointe navigation-arrow-pointe-${ direction }`}></div>
                <div className={`navigation-arrow-pointe navigation-arrow-pointe-${ direction }`}></div>
             </div>
        </div>
    )
}

export default NavigationArrow