function locomotiveJs() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveJs();

function cursorEffect() {
  const page1Content = document.querySelector(".page1-content");
  const cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();
function cursorEffect2() {
  const page4 = document.querySelector("#page4");
  const cursor2 = document.querySelector("#cursor2");

  page4.addEventListener("mousemove", function (dets) {
    gsap.to(cursor2, {
      x: dets.x,
      y: dets.y,
    });
  });

  page4.addEventListener("mouseenter", function () {
    gsap.to(cursor2, {
      scale: 1,
      opacity: 1,
    });
  });
  page4.addEventListener("mouseleave", function () {
    gsap.to(cursor2, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect2();

function spanHeading() {
  const heading = document.querySelector(".spanHeading");
  const text = heading.innerHTML;
  heading.innerHTML = "";
  for (el of text) {
    const span = document.createElement("span");
    span.innerHTML = el;
    heading.append(span);
  }
}
spanHeading();

function paraAnimation() {
  gsap.from(".page2 p", {
    y: "100%",
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".page2 p",
      scroller: "#main",
      // markers: true,
      scrub: 2,
      start: "top 100%",
      end: "top 90%",
    },
  });
}
paraAnimation();

function videoPlayer() {
  const videos = document.querySelectorAll(".page3-elem .box video");
  for (video of videos) {
    video.addEventListener("mouseenter", function () {
      this.play();
    });
    video.addEventListener("mouseleave", function () {
      this.pause();
      this.load();
    });
  }
}
videoPlayer();

function sliderAnimation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    freeMode: true,
    speed: 3000,
    autoplay: {
      delay: 300,
    },
  });
}

sliderAnimation();

function loaderAnimation() {
  let tl = gsap.timeline();
  tl.from("#loader h3", {
    x: 30,
    duration: 1,
    stagger: 0.1,
    opacity: 0,
  });
  tl.to("#loader h3", {
    opacity: 0,
    x: -40,
    stagger: 0.1,
    duration: 0.5,
  });
  tl.to("#loader", {
    height: 0,
    duration: 1,
  });
  tl.from(".spanHeading span", {
    y: 50,
    stagger: 0.1,
    duration: 0.4,
    delay: -0.7,
    opacity: 0,
  });
}
loaderAnimation();
