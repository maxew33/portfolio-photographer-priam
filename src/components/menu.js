import React, { Fragment } from 'react'
import MenuRubrique from './menuRubrique'

const rubriques = [
    {   id: 1,
        nom: 'Accueil'        
    },
    {
        id: 2,
        nom: 'Contact'
    },
    {
        id: 3,
        nom: 'À propos'
    }
]


const Menu = () => {
    return(
        <Fragment>

            {rubriques.map((rubrique, index) => (
            <MenuRubrique
                key = {index}
                nomRubrique = {rubrique.nom}
                click = {rubrique.id}
             />))}

        </Fragment>
    )
}

export default Menu