const mode = document.querySelector('body');
const modeBtn = document.querySelector('#mode');
const lightresume = document.querySelector('#light-resume');
const darkresume = document.querySelector('#dark-resume');
const lightimg = document.querySelector('#light-img');
const darkimg = document.querySelector('#dark-img');


const menu = document.querySelector('.nav-btn');
const nav = document.querySelector('nav');

function showMenu(e) {
    if (!nav.classList.contains('active')) {
        console.log("henlo");
        nav.classList.add('active');
        gsap.to('.line1', 0.25, { rotate: '45', y: 5 });
        gsap.to('.line2', 0.25, { rotate: '-45', y: -5 });
        gsap.fromTo(nav, { opacity: '0' }, { opacity: '1', duration: 0.5 });

    } else {
        console.log("byebye");
        gsap.to('.line1', 0.25, { rotate: '0', y: 0 });
        gsap.to('.line2', 0.25, { rotate: '0', y: 0 });
        gsap.fromTo(nav, { opacity: '1' }, { opacity: '0', duration: 0.5 });
        setTimeout(
            function () { nav.classList.remove('active') }, 500
        );
    }
}

menu.addEventListener('click', showMenu);

function changeMode() {
    if (mode.classList.contains('light')) {
        console.log("es de día, adios día")
        modeBtn.innerText = "🌞";
        mode.classList.remove('light');
        lightresume.classList.add("hidden")
        lightimg.classList.add("hidden")
        darkresume.classList.remove("hidden")
        darkimg.classList.remove("hidden")
        mode.classList.add('dark');
    } else {
        console.log("es de noche, adios noche")
        modeBtn.innerText = "🌛";
        mode.classList.remove('dark');
        darkresume.classList.add("hidden")
        darkimg.classList.add("hidden")
        lightresume.classList.remove("hidden")
        lightimg.classList.remove("hidden")
        mode.classList.add('light');
    }
};