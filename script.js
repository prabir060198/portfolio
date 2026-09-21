// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


// Close menu after clicking a link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


// ================================
// CURRENT YEAR
// ================================

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


// ================================
// SIMPLE SCROLL EFFECT
// ================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach(section => {

    observer.observe(section);

});