document.addEventListener('DOMContentLoaded', () => {

    //video pleer 
    (function () {
        let video = document.querySelector('.video-b video')
        let videoBg = document.querySelector('.video-bg')
        let videoB = document.querySelector('.video-b')

        let play = false

        videoB.addEventListener('click', () => {
            if (!play) {
                play = true
                video.play()
                videoBg.style.display = 'none'
            } else {
                video.pause()
                videoBg.style.display = 'block'
                play = false
            }

        })

    })();


    //yandex map init
    (function () {
        let myMap

        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init)

        function init() {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            myMap = new ymaps.Map('map', {
                // При инициализации карты обязательно нужно указать
                // её центр и коэффициент масштабирования.
                center: [55.750722, 37.649410], // Москва
                zoom: 16,
                controls: ['zoomControl'],

            }),
                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF font-weight: bold">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark([55.750722, 37.649410], {
                    hintContent: 'Тессинский, 1',
                    balloonContent: 'Москва, Тессинский переулок, дом 1'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: './assets/img/t-logo.png',
                    // Размеры метки.
                    iconImageSize: [70, 70],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                })
            myMap.behaviors.disable('scrollZoom')

            //на мобильных устройствах... (проверяем по userAgent браузера)
            // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //     //... отключаем перетаскивание карты
            //     myMap.behaviors.disable('drag')
            // }

            myMap.geoObjects.add(myPlacemark)

        }

    })();


    (function () {
        const swiper = new Swiper('.s-gallery .swiper', {
            loop: true,
            spaceBetween: 50,
            width: 1000,
            scrollbar: {
                el: '.swiper-scrollbar',
              },
            breakpoints: {
                320: {
                    width: null
                },
                1200: {
                    width: 1000
                }
            }

        })

    })();

if(window.innerWidth >= 1200) {
    (function () {
        let swiperSlide = document.querySelector('.s-gallery .swiper')
        let cursor = document.querySelector('.drag-cursor')

        
        swiperSlide.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block'
            mouseX = e.clientX - 50
            mouseY = e.clientY - 50
            cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`
        })
        swiperSlide.addEventListener('mouseleave', () => {
            cursor.style.display = 'none'
        })


    })();
}


//flats tabs
    (function () {
        let flatTabs = document.querySelectorAll('.flats-tab')
        let flatContent = document.querySelectorAll('.flats-content')

        flatTabs.forEach(item => {
            item.addEventListener('click', function() {
                let tabAttr = item.getAttribute('data-flats')
                flatTabs.forEach(el => {
                    el.classList.remove('active')
                })
                item.classList.add('active')
                
                flatContent.forEach(elem => {
                    let contentAttr = elem.getAttribute('data-flats')
                    elem.classList.remove('active')
                    elem.style.display = 'none'
                    if(tabAttr === contentAttr) {
                        // elem.classList.add('active')
                        gsap.fromTo(elem,
                            {
                                y: 70,
                                autoAlpha: 0
                            },
                            {
                                display: 'flex',
                                y: 0,
                                autoAlpha: 1,
                                duration: 0.5,
                                ease: 'power2'
                            })
                    }
                })
            })
        })
        
    })();


    //scroll s-benefits
    if(window.innerWidth >= 1200) {
        (function () {
            const sectionTrigger = document.querySelector('.s-benefits')
            const screenWidth = document.querySelector('.s-benefits-items').clientWidth
            const benefitsItems = document.querySelectorAll('.s-benefits-item')
            let benefitsItemsLength = 0
            benefitsItems.forEach(item => {
                benefitsItemsLength += item.clientWidth + 30
            })
            let viewLength = benefitsItemsLength - screenWidth
            
            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.trigger-el',
                  start: "top top",
                  scrub: 1,
                  pin: true
                }
              });
     
            tl.to('.s-benefits-items', {
                x: -(viewLength + 100),
                ease: 'none'
            })
    
            
        })();
    }


    function closePopup(params) {
        const popupWrap = document.querySelector('.popup-wrap')
        const close = document.querySelector('.popup__close')
        close.addEventListener('click', () => {
            popupWrap.style.display = 'none'
        })
       
    }
    closePopup()



    function popupOpen(params) {
        const popupWrap = document.querySelector('.popup-wrap')
        const flatBtns = document.querySelectorAll('.button--flat')
        flatBtns.forEach(item => {
            item.addEventListener('click', () => {
                popupWrap.style.display = 'flex'
            })
        })

    }
    popupOpen()



    function animateOnScroll() {

        const fadeInElems = document.querySelectorAll('.fade_in_animate')
        const fadeInRight = document.querySelectorAll('.fade_in_right')
        const fadeInLeft = document.querySelectorAll('.fade_in_left')

    
        function hide(elem) {
            gsap.set(elem, { autoAlpha: 0 });
        }

        gsap.utils.toArray(fadeInElems).forEach(item => {
            hide(item);
            ScrollTrigger.create({
                trigger: item,
                onEnter: function () {
                    gsap.to(item, {
                        autoAlpha: 1,
                        duration: 1.5,
                        ease: 'expo.inOut'
                    })
                },
                once: true
            })

        })
        gsap.utils.toArray(fadeInRight).forEach(item => {
            hide(item);
            ScrollTrigger.create({
                trigger: item,
                onEnter: function () {
                    gsap.fromTo(item,
                    {
                        x: 80,
                        autoAlpha: 0
                    },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 1.5,
                        ease: 'power2.inOut'
                    }
                    )
                },
                once: true
            })

        })
        gsap.utils.toArray(fadeInLeft).forEach(item => {
            hide(item);
            ScrollTrigger.create({
                trigger: item,
                onEnter: function () {
                    gsap.fromTo(item,
                    {
                        x: -80,
                        autoAlpha: 0
                    },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 1.5,
                        ease: 'power2.inOut'
                    }
                    )
                },
                once: true
            })

        })


    }

    animateOnScroll();


    function easyScroll() {
        const ancors = document.querySelectorAll('a[href*="#"]')

        ancors.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                const anc = item.getAttribute('href')

                gsap.to(window, {
                    duration: 0.5,
                    scrollTo: anc,
                    ease: 'power2.inOut'
                })
            })
        })

    }

    easyScroll()



})