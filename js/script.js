let controller;
let slideScene;

function animateSlide() {
    controller = new ScrollMagic.Controller();

    // const exploreScene = new ScrollMagic.Scene({
    //     triggerElement: '.page02 .hero-txt',
    //     triggerHook: 0.5
    // })
    //     .addIndicators({ colorStart: 'red', colorTrigger: 'red' })
    //     .addTo(controller);

    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');

    sliders.forEach(slide => {
        const revealImg = slide.querySelector('.reveal-img');
        const revealTxt = slide.querySelector('.reveal-text');
        const img = slide.querySelector('img');
        //GSAP

        const SlideTimeline = gsap.timeline({ defaults: { duration: 1, ease: 'sine.inOut' } });

        SlideTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' });
        SlideTimeline.fromTo(revealTxt, { x: '0%' }, { x: '100%' }, '-=0.75');
        SlideTimeline.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.75')

    })
}

function cursor(e) {
    console.log(e);
    let mouse = document.querySelector('.cursor');
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}
window.addEventListener("mousemove", cursor);


animateSlide()