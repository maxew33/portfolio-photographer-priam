export const showGallery = (galerie) => {
    const titre = document.querySelector('.titre'),
    name = document.querySelector('.name'),
    showNavigation = document.getElementsByClassName('show__navigation'),
    mainPictureContainer = document.querySelector('.show__pictures'),
    mainPicture = document.querySelector('.show__pictures-img')

    let imageRank = 2
    
    mainPictureContainer.classList.add('show__pictures-disappear')
    mainPicture.classList.add('show__pictures-img-shown')
    mainPicture.dataset.follow = true
    mainPicture.dataset.coef = 1.1
    mainPicture.dataset.pos = 'main'
    mainPicture.dataset.bottom = window.innerHeight

    titre.classList.add('titreToTop')
    name.classList.add('nameToTop')
    for ( const element of showNavigation){
        element.classList.add('disappear')
    }

    mainPictureContainer.addEventListener('wheel', (e) => {
        console.log('wheel')
        showNewPicture()
    })

    const showNewPicture = () =>{
        console.log('new picture')
    }
}