let burger = document.querySelector(".burger-menu");
let navTab = document.querySelector('.mobile');
let navLinks = document.querySelectorAll(".nav-links a")


burger.addEventListener("click",()=>{
    burger.classList.toggle("active");
    navTab.classList.toggle("active");
})


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');      // turn X back to burger
        navTab.classList.remove('active');  // slide menu left
    });
});

const slider = document.querySelector('.service-container');

let isDown = false;
let startX = 0 ;
let scrollLeft = 0;

// slider.addEventListener('mousedown',(e)=>{
//     isDraggging = true;
//     startX = e.pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;
//     slider.classList.add('active'); 
// })

// slider.addEventListener('mouseleave', () => {
//   isDown = false;
//    slider.classList.remove('active');
// });

// slider.addEventListener('mouseup', () => {
//   isDown = false;
//    slider.classList.remove('active');
// });

// slider.addEventListener('mousemove', (e) => {
//   if(!isDown) return;

//   e.preventDefault();

//   const x = e.pageX - slider.offsetLeft;
//   const walk = (x - startX) * 2;
//   slider.scrollLeft = scrollLeft - walk;
// });
 function startDrag(e) {
    isDragging = true;
    // Unified way to get coordinates (mouse or touch)
    const pos = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    startX = pos - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    
    slider.classList.add('active');
    // Optional: better feel
    slider.style.cursor = 'grabbing';
    // Prevent selection even more aggressively
    document.body.style.userSelect = 'none';
}

function stopDrag() {
    isDragging = false;
    slider.classList.remove('active');
    slider.style.cursor = 'grab';
    document.body.style.userSelect = '';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const pos = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const walk = (pos - startX) * 1.8; // adjust multiplier 1.2 – 3.0
    slider.scrollLeft = scrollLeft - walk;
}

slider.addEventListener('mouseup', () => {
    stopDrag();
    // Optional snap (if items have known width)
    const cardWidth = 280; // example
    slider.scrollLeft = Math.round(slider.scrollLeft / cardWidth) * cardWidth;
});

// Mouse events
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mousemove', drag);
slider.addEventListener('mouseup', stopDrag);
slider.addEventListener('mouseleave', stopDrag);

// Touch events (very important for mobile)
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchmove', drag);
slider.addEventListener('touchend', stopDrag);

// Optional: nice default cursor when hovering
slider.style.cursor = 'grab';


const track = document.querySelector(".specials-track");
const slides = document.querySelectorAll(".specials-track img");

if (slides.length === 0) {
    console.warn("No slides found in .specials-track");
} else {
    let index = 0;
    let interval = null;
    const intervalTime = 4000;

    function goToSlide(newIndex) {
        index = newIndex;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        const nextIndex = (index + 1) % slides.length; // cleaner modulo
        goToSlide(nextIndex);
    }

    function startSlider() {
        if (interval) return; // prevent multiple timers
        interval = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Initialize
    startSlider();

    // Pause/resume on hover
    track.addEventListener('mouseenter', stopSlider);
    track.addEventListener('mouseleave', startSlider);

    // Optional: also pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });
}


// const buttons = document.querySelectorAll(".event-btn");

// buttons.forEach(btn => {

//     btn.addEventListener("click", () => {

//         const gallery = btn.nextElementSibling;

//         gallery.classList.toggle("active");

//     });

// });

const eventButtons = document.querySelectorAll('.event-btn');
const gallerySection = document.getElementById('gallery');
const galleries = document.querySelectorAll('.gallery');
const closeButtons = document.querySelectorAll('.close-gallery');

eventButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default anchor jump
    const galleryClass = btn.dataset.gallery;
    
    galleries.forEach(g => g.style.display = 'none'); // hide all galleries
    document.querySelector(`.${galleryClass}`).style.display = 'block'; // show selected
    
    gallerySection.style.display = 'block'; // show gallery section
    gallerySection.scrollIntoView({behavior: 'smooth'}); // smooth scroll
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    gallerySection.style.display = 'none'; // hide gallery section
  });
});