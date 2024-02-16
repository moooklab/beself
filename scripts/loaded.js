accordions = document.querySelectorAll('dialog div.accordion')
popupProductGallery = document.querySelector('dialog[data-modal-name=product] div.swiper')

accordions.forEach( element => {
    button = element.querySelector('div.accordion_caption')
    content = element.querySelector('div.accordion_content')
    new Accordion(element, button, content, 300)
})

new Swiper(popupProductGallery, {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        prevEl: popupProductGallery?.querySelector('div.swiper-navigation > *:first-child'),
        nextEl: popupProductGallery?.querySelector('div.swiper-navigation > *:last-child'),
    },
    pagination: {
        el: popupProductGallery?.querySelector('div.swiper-pagination'),
        clickable: true
    },
    breakpoints: {
        960: {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: false,
            // watchSlidesProgress: true
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
            centeredSlidesBounds: true
        }
    }
})



var dropContainer = document.querySelector('label[for=file')

if (dropContainer) {

    dropContainer.ondragover = dropContainer.ondragenter = function(event) { event.preventDefault() }
    
    dropContainer.ondrop = function(event) {
        event.preventDefault()
    
        var files = event.dataTransfer.files
        this.previousElementSibling.files = files

        getImages(event.dataTransfer)
    }

}

