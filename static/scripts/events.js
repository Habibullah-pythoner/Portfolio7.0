const serviceSlider = document.querySelector('#services #slider_parent')
const banner = document.querySelector('#banner')
const scrollBar = document.querySelector('#scrollBar')
const main_window = document.querySelector('#main-window')
var menu_open = false
const works = document.querySelectorAll('#works #work')
const cursor = document.querySelector('#cursor')

document.addEventListener('mousemove', (event)=> {
    var x = event.clientX
    var y = event.clientY

    cursor.style.top = y + "px"
    cursor.style.left = x + "px"
})

function observeSnapContainers() {
    const containers = document.querySelectorAll('.snap-scroll-container');
  
    containers.forEach(container => {
      const triggerElements = container.querySelectorAll('.snap-trigger');
  
      const observerOptions = {
        root: container,
        rootMargin: '0px',
        threshold: 1, // Adjust this threshold as needed
      };
  
      const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                console.log("Ye");
                // The element is now in view
                entry.target.classList.add("active")
                // Perform your action here, e.g., change styles, execute a function, etc.
            } else {
                entry.target.classList.remove("active")
            }

        });
      };
  
      const intersectionObserver = new IntersectionObserver(handleIntersection, observerOptions);
  
      triggerElements.forEach(element => {
        intersectionObserver.observe(element);
      });
    });
}

function wrapText(element) {
    element.innerHTML = element.textContent.replace(/(\S*)/g, m => {
        return `<div class="word">` +
          m.replace(/(-|#|@)?\S(-|#|@)?/g, str => {
            // Replace spaces with non-breaking spaces (&nbsp;)
            if (str === ' ') {
              return '&nbsp;';
            }
            return "<span class='letter'>" + str + "</span>";
          }) +
          `</div>`;
      });
  }

const h1ToWrap = document.querySelectorAll("#canvas #text h1")
h1ToWrap.forEach((e)=> {
    wrapText(e);
})



function menu() {
    document.body.classList.toggle('menu')
}

document.querySelector('#main-window').addEventListener('scroll', ()=> {
    var scrollTop = document.querySelector('#main-window').scrollTop
    var scrollHeight = document.querySelector('#main-window').scrollHeight - innerHeight
    if(scrollTop >= innerHeight) {
        document.body.classList.add("message")
    } else {
        document.body.classList.remove("message")
    }
    console.log(scrollTop + " - " + scrollHeight);
    if(scrollTop > scrollHeight - 250) {
      document.body.classList.add("end")
    } else {
      document.body.classList.remove("end")
    }
})
window.addEventListener('resize', ()=> {
    setFullHeights()
})

function dummyHeight() {
  if(document.querySelector('#services #dummy')) {
    document.querySelector('#services #dummy').style.height = serviceSlider.scrollWidth - serviceSlider.offsetWidth + "px"
  }
}

function setFullHeights() {
    const elements = document.querySelectorAll('.full_height');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
    var toCut = 0;
    if (element.hasAttribute('data-cut')) {
        toCut = element.getAttribute('data-cut')
    }
      element.style.height = windowHeight - toCut + 'px';
    });
  }

function banner_contact() {
  document.body.classList.toggle('contact')
}

works.forEach(work => {
  work.addEventListener('mouseenter', ()=> {
    document.body.classList.add("cursorText")
  })
  work.addEventListener('mouseleave', ()=> {
    document.body.classList.remove("cursorText")
  })
})

function tick() {
    requestAnimationFrame(tick)
    var scrollTop = main_window.scrollTop;
    if (innerWidth < 1569) {
      var scrollBarHeight = innerHeight - 30 - (banner.offsetHeight + (15 * 1) - (Math.min(banner.offsetHeight + (15 * 1), scrollTop)))
    } else {
      var scrollBarHeight = innerHeight - 30
    }
    scrollBar.style.height = scrollBarHeight + "px"
    scrollBar.querySelector('#thumb').style.top = scrollTop / (main_window.scrollHeight / main_window.offsetHeight) + "px"
}
tick()

function loaded() {
    console.log('Hola');
    setFullHeights()
    dummyHeight()
    observeSnapContainers()
}