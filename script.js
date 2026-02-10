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