header = document.querySelector('header')
productsSliders = document.querySelectorAll('section.products_slider div.swiper.products')
productGalleries = document.querySelectorAll('div.swiper.product_gallery')
productGalleryThumbs = document.querySelector('section.main div.swiper.thumbs')
productGalleryImages = document.querySelector('section.main div.swiper.gallery')
mainSlider = document.querySelector('section.main div.swiper.main')
clients = document.querySelector('section.clients div.swiper')
blog = document.querySelector('section.blog div.swiper')




productsSliders.forEach( slider => {
    new Swiper(slider, {
        slidesPerView: 1.5,
        spaceBetween: 10,
        watchSlidesProgress: true,
        autoHeight: true,
        navigation: {
            prevEl: slider.closest('section.products_slider').querySelector('div.swiper-navigation > *:first-child'),
            nextEl: slider.closest('section.products_slider').querySelector('div.swiper-navigation > *:last-child'),
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            960: {
                slidesPerView: 3.5,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            }
        }
    })
})

productGalleries.forEach( gallery => {
    new Swiper(gallery, {
        speed: 300,
        slidesPerView: 1,
        allowTouchMove: true,
        pagination: {
            el: gallery?.querySelector('div.swiper-pagination'),
        },
        breakpoints: {
            960: {
                speed: 0,
                allowTouchMove: false,
            }
        },
        on: {
            init: function () {

                // Добавляем области для переключения фотографий
                navigationThumbs = document.createElement('div')
                navigationThumbs.classList.add('navigation-thumbs')

                for (let index = 0; index < this.slides.length; index++) {
                    let navigationThumb = document.createElement('div')
                        navigationThumb.classList.add('navigation-thumb')
                        navigationThumbs.append(navigationThumb)
                        
                    // Добавляем активный класс к первому элементу 
                    index == 0 && navigationThumb.classList.add('active')

                    // При наведении меняем слайд, добавляем активный класс
                    navigationThumb.addEventListener('mouseenter', event => {
                        thumbs = navigationThumb.parentElement.querySelectorAll('.navigation-thumb')
                        thumbs.forEach( thumb => {
                            thumb.classList.remove('active')
                        })
                        navigationThumb.classList.add('active')
                        this.slideTo(index)
                    })

                    // Возвращение на первое фото при покидании мышки
                    navigationThumbs.addEventListener('mouseleave', event => {
                        thumbs = navigationThumb.parentElement.querySelectorAll('.navigation-thumb')
                        thumbs.forEach( thumb => {
                            thumb.classList.remove('active')
                        })
                        thumbs[0].classList.add('active')
                        this.slideTo(0) 
                    })
                }

                this.el.prepend( navigationThumbs )

                

            }
        }
    })
})

var productGalleryThumbsSwiper = new Swiper(productGalleryThumbs, {
    slidesPerView: 'auto',
    spaceBetween: 30,
    autoHeight: true,
    direction: 'vertical',
})

new Swiper(productGalleryImages, {
    slidesPerView: 1,
    spaceBetween: 10,
    thumbs: {
        swiper: productGalleryThumbsSwiper,
        autoScrollOffset: .5
    },
    navigation: {
        prevEl: productGalleryImages?.querySelector('div.swiper-navigation > *:first-child'),
        nextEl: productGalleryImages?.querySelector('div.swiper-navigation > *:last-child'),
    },
    pagination: {
        el: productGalleryImages?.querySelector('div.swiper-pagination'),
        clickable: true
    },
    breakpoints: {
        960: {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: false
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
            centeredSlidesBounds: true
        }
    }
})

new Swiper(blog, {
    slidesPerView: 1.5,
    spaceBetween: 10,
    watchSlidesProgress: true,
    breakpoints: {
        960: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        }
    }
})

new Swiper(mainSlider, {
    pagination: {
        el: mainSlider?.querySelector('div.swiper-pagination'),
        clickable: true
    },
    navigation: {
        prevEl: mainSlider?.querySelector('div.swiper-navigation > *:first-child'),
        nextEl: mainSlider?.querySelector('div.swiper-navigation > *:last-child'),
    }
})

new Swiper(clients, {
    slidesPerView: 2,
    spaceBetween: 10,
    autoHeight: true,
    grid: {
        rows: 2,
        fill: 'row'
    },
    breakpoints: {
        960: {
            slidesPerView: 4,
            spaceBetween: 30,
            grid: {
                rows: 2,
                fill: 'row'
            }
        },
        640: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoHeight: true,
            grid: false,
        }
    }
})



// Загрузка изображении
let getImages = (data) => {
    
    files = [...data.files]
    fieldset = document.querySelector('fieldset.images div.list')

    // Удаление загруженых изображений
    fieldset.querySelectorAll('img').forEach( image => {
        image.remove()
    })

    // На каждый файл создаем картинку и вставляем в поле
    files.forEach( file => {
        image = document.createElement('img')
        image.src = window.URL.createObjectURL(file)
        fieldset.append(image)
    })

}

// Скрыть / Показать поиск
let showSearch = () => {
    header.classList.remove('menu')
    header.classList.remove('cart')
    header.classList.toggle('search')
}

// Скрыть / Показать меню
let showMenu = () => {
    header.classList.remove('search')
    header.classList.remove('cart')
    header.classList.toggle('menu')
}

// Скрыть / Показать корзину
let showCart = (event) => {
    header.classList.remove('search')
    header.classList.remove('menu')
    header.classList.add('cart')

    header.addEventListener('mouseleave', event => {
        header.classList.remove('cart')
    })
}

// Скрыть / Показать пароль
let showPassword = (element) => {
    element.classList.toggle('active')
    input = element.previousElementSibling
    input.type == 'password' ? input.type = 'text' : input.type ='password'
}

// Добавление заметки (активная радиокнопка) при переключении радиокнопок
let setFilterNote = (element) => {
    noteElement = element.closest('div.accordion').querySelector('strong[data-note]')
    noteText = element.querySelector('span').innerHTML
    noteElement.setAttribute('data-note', noteText)
}

// Смена вида отображения каталога товаров
let changeView = (element) => {
    list = document.querySelector('div.products div.list')
    buttons = document.querySelector('div.sort div.view')

    if ( element ) {
        buttons.querySelectorAll('div[data-view]').forEach( button => {
            button.classList.remove('active')
        })
        element.classList.add('active')
        localStorage.view = element.getAttribute('data-view')
    }

    if (localStorage.view && buttons && list) {
        buttons.querySelector('div[data-view=' + localStorage.view + ']').classList.add('active')
        list.setAttribute('data-view', localStorage.view)
    }
     
}

let setHeaderHeight = () => {
    var header_height = header.querySelector('div.sticky').getBoundingClientRect().bottom
    document.documentElement.style.setProperty('--available-height', (window.innerHeight - header_height) + "px")
}

changeView()
setHeaderHeight()

window.addEventListener('scroll', () => {
    setHeaderHeight()
})

window.addEventListener('resize', () => {
    setHeaderHeight()
})
