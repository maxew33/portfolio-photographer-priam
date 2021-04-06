import React from 'react'
import '../style/imgNavigationArrow.css'

const ImgNavigationArrow = ({ direction, chgt }) => {

    return(
        <div 
        className={`imgNavigation imgNavigation-${ direction }`}
        onClick={chgt}>
            <div className={`imgNavigation-arrow imgNavigation-arrow-${ direction }`}>
                <div className={`imgNavigation-arrow-pointe imgNavigation-arrow-pointe-${ direction }`}></div>
                <div className={`imgNavigation-arrow-pointe imgNavigation-arrow-pointe-${ direction }`}></div>
             </div>
        </div>
    )
}

export default ImgNavigationArrow