let controller;
let slideScene;

let mouse = document.querySelector('.cursor');
let mouseMsg = mouse.querySelector('span');
function cursor(e) {
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
    //please say syke
    // const CursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    // CursorTimeline.fromTo(mouse, { scale: 0.8 }, { scale: 1.2 });
}
function activeCursor(e) {
    const item = e.target;
    if (item.id === 'logo' || item.classList.contains('menu')) {
        mouse.classList.add('nav-active');
    }
    else {
        mouse.classList.remove('nav-active');
    }
    if (item.classList.contains('btn')) {
        mouse.classList.add('btn-active');
        gsap.to('.title-swipe', 0.75, { y: '0%' });
        mouseMsg.innerText = "🤠";
    }
    else {
        mouse.classList.remove('btn-active');
        gsap.to('.title-swipe', 0.75, { y: '100%' });
        mouseMsg.innerText = "";
    }
}
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
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'red',
                name: 'slide'
            })
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
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'red',
                name: 'page',
                indent: 100
            })
            .setPin(slide, { pushFollowers: false })
            .setTween(PageTimeline)
            .addTo(controller);
    })
}

animateSlide()