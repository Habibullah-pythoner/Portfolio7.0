const slides = document.querySelectorAll('#works #slider #work')

var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    cardsEffect: {
        rotate: false,
        shadow: false,
    },
    // coverflowEffect: {
    //   rotate: 0,
    //   stretch: 0,
    //   depth: 500,
    //   slideShadows: false,
    // },
    on: {
        init: function () {
            // Calculate the space between slides as 50% of the slide width
            var slideWidth = this.slides[0].offsetWidth;
            var spaceInPixels = -0.5 * slideWidth; // 50% of slide width in pixels
            // this.params.spaceBetween = spaceInPixels;
        },
        slideChangeTransitionStart: (e)=> {
            hidePrevSlides(e) 
        },
        slideChangeTransitionEnd: (e)=> {
            hidePrevSlides(e)  
        }
      },
  });
  Swiper.use([Keyboard]);
function hidePrevSlides(e) {
    var index = e.activeIndex
    for(var i = 0;i < slides.length;i++) {
        if (i < index) {
            slides[i].classList.add("hide")
        } else if(i > index) {
            slides[i].classList.add("border_only")
        } else {
            slides[i].classList.remove("border_only")
            slides[i].classList.remove("hide")
        }
    }
}