export const showGallery = (galerie) => {
    const titre = document.querySelector('.titre'),
    name = document.querySelector('.name'),
    container = document.querySelector('.show__container'),
    navigationLeft = document.querySelector('.navigation-left'),
    navigationRight = document.querySelector('.navigation-right'),
    mainPicture = document.querySelector('.show__pictures-img'),
    leftPictureContainer = document.querySelector('.show__pictures-column-left'),
    centerPictureContainer = document.querySelector('.show__pictures-column-center'),
    rightPictureContainer = document.querySelector('.show__pictures-column-right'),
    backToTop = document.querySelector('.backToTop')

    mainPicture.classList.add('show__pictures-img-shown')
    
    mainPicture.dataset.follow = true
    mainPicture.dataset.pos = 'center'
    mainPicture.classList.add('step2')

    backToTop.classList.add('backToTop-apparition')

    rightPictureContainer.setAttribute('style', 'position: absolute; top: 70vh;')
    leftPictureContainer.setAttribute('style', 'position: absolute; top: 70vh;')
    centerPictureContainer.setAttribute('style', 'position: absolute; top: 0;')

    let imageRank = 2

    let mainImageRank = 1
    
    titre.classList.add('titreToTop')
    name.classList.add('nameToTop')
    container.style.overflowY = 'scroll'
    navigationLeft.style.transform = 'translateX(-75vh)'
    navigationRight.style.transform = 'translateX(75vh)'

    setTimeout(function(){ 
        const pictureLeft = document.createElement('img')
        pictureLeft.className = "show__pictures-img-shown"
        pictureLeft.alt = galerie.img[1].name
        pictureLeft.src = galerie.img[1].src
        pictureLeft.dataset.follow = true
        pictureLeft.dataset.pos = 'left'
        pictureLeft.style.width = 100 + (Math.random()-0.5)*20 + '%'
        leftPictureContainer.appendChild(pictureLeft)
        pictureLeft.addEventListener('click', () => {console.log('click picture left')})

        const pictureRight = document.createElement('img')
        pictureRight.className = "show__pictures-img-shown"
        pictureRight.src = galerie.img[2].src
        pictureRight.alt = galerie.img[2].name
        pictureRight.dataset.follow = true
        pictureRight.dataset.pos = 'right'
        pictureRight.style.width = 100 + (Math.random()-0.5)*20 + '%'
        rightPictureContainer.appendChild(pictureRight)
    }, 500);

    container.addEventListener('scroll', (e) => {
        const picturesFollowed = document.querySelectorAll('img[data-follow = true]')

        for(const followed of picturesFollowed){
            const bottomPos = followed.getBoundingClientRect().bottom
            console.log(followed.alt + ' a un bottom de :' + bottomPos)

            if (window.innerHeight >= bottomPos){
                followed.dataset.follow = false
                imageRank++
                if(imageRank >= galerie.img.length){imageRank = 0}
                showNewPicture(followed, imageRank)
                }
            }
        
        console.log('wheel')
    })

    const showNewPicture = (elt, rank) =>{
        console.log('new picture à ' + elt +' et numéro :' + rank)

        const picture = document.createElement('img')
        picture.className = "show__pictures-img-shown"
        picture.src = galerie.img[rank].src
        picture.alt = galerie.img[rank].name
        picture.dataset.follow = true
        picture.style.width = 100 + (Math.random()-0.5)*20 + '%'
        elt.insertAdjacentElement('afterend', picture)
        
    }
}

/* show__pictures style:
left : 20%
center : 50%
right : 30%
height : 100%
text-align: center */