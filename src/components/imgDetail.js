export const ImgDetail = (img) => {

    console.log('click sur : ' + img.name)
    console.log(img)
    document.querySelector('.slide-transition').style.left = '100vw'
    setTimeout(function(){
        
        document.querySelector('.image__detail-img').src = img.src
        document.querySelector('.image__detail-img').alt = img.alt
        
        document.querySelector('.image__detail-spec-nom-photo').textContent = 'Nom de la photo : ' + img.name
        document.querySelector('.image__detail-spec-lieu').textContent = img.lieu
        document.querySelector('.image__detail-spec-date').textContent = img.date
        document.querySelector('.image__detail-spec-desc').textContent = img.description

        document.querySelector('.image__detail').style.left = '0'
    }, 500); 

}