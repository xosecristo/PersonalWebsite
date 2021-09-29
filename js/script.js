let controller;
let slideScene;

const logo = document.querySelector('#logo');
const mouse = document.querySelector('.cursor');
const menu = document.querySelector('.menu');
const mouseMsg = mouse.querySelector('span');

function cursor(e) {
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}
function activeCursor(e) {
    const item = e.target;
    console.log(item);

    if (item.id === 'logo'
        || item.classList.contains('menu')) {
        mouse.classList.add('nav-active');
    } else {
        mouse.classList.remove('nav-active');
    }

    if (item.classList.contains('btn')) {
        mouse.classList.add('btn-active');
        gsap.to('.title-swipe', 0.75, { y: '0%' });

        if (item.classList.contains('email')) {
            mouseMsg.innerText = "💌";
            //✉
        } else {
            mouseMsg.innerText = "🤠";
        }
    } else {
        mouse.classList.remove('btn-active');
        gsap.to('.title-swipe', 0.75, { y: '-100%' });
        mouseMsg.innerText = "";
    }
}

function toggle(e) {
    if (!e.target.classList.contains('active')) {
        e.target.classList.add('active');
        document.body.classList.add('nav');
        gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: 'var(--primary)' });
        gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: 'var(--primary)' });
        gsap.to('.navigation', 1, { clipPath: 'circle(2500px at 100% -10%)' });
        gsap.to('#logo', 1, { color: 'var(--primary)', textShadow: '0 0 5px var(--secondary);' })
        logo.classList.add('nav');
        menu.classList.add('nav');

    } else {
        e.target.classList.remove('active');
        document.body.classList.remove('nav');
        gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: '#fff' });
        gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: '#fff' });
        gsap.to('.navigation', 1, { clipPath: 'circle(50px at 100% -10%)', textShadow: 'none' });
        gsap.to('#logo', { color: '#fff' })
        logo.classList.remove('nav');
        menu.classList.remove('nav');
    }

}
menu.addEventListener('click', toggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

function animateSlide() {
    controller = new ScrollMagic.Controller();

    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');

    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.reveal-img');
        const revealTxt = slide.querySelector('.reveal-text');

        //GSAP
        const SlideTimeline = gsap.timeline({ defaults: { duration: 1, ease: 'sine.inOut' } });

        SlideTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' });
        SlideTimeline.fromTo(revealTxt, { x: '0%' }, { x: '100%' }, '-=0.75');

        SlideTimeline.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.75');

        //Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerElementHook: 0.25,
            reverse: false
        })
            .setTween(SlideTimeline)
            // .addIndicators({
            //     colorStart: 'white',
            //     colorTrigger: 'red',
            //     name: 'slide'
            // })
            .addTo(controller);

        //Page
        const PageTimeline = gsap.timeline();
        let nexSlide = slides.length - 1 === index ? 'end' : slides[index + 1];

        //Page Timeline
        PageTimeline.fromTo(nexSlide, { y: "0%" }, { y: "50%" })
        PageTimeline.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
        PageTimeline.fromTo(nexSlide, { y: "50%" }, { y: "0%" }, '-=0.5')

        //Page Scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            // .addIndicators({
            //     colorStart: 'white',
            //     colorTrigger: 'red',
            //     name: 'page',
            //     indent: 100
            // })
            .setPin(slide, { pushFollowers: false })
            .setTween(PageTimeline)
            .addTo(controller);
    })
}

animateSlide()