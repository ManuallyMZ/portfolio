<template>
  <div class="about" :style="{marginTop: topnavHeight +'px'}">
    <div style="height: 100vh;width: 30%;background: black;
    position: fixed;display: block;top: 0;align-items: center;justify-content: center;overflow: hidden;opacity: 0;
    "
    class="svg-container"
    >
      <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1800" preserveAspectRatio="xMinYMin meet" >
        <path class="line01 line" d="M 10 200  600 200" />
        <path class="line02 line" d="M 10 400  600 400" />
        <path class="line03 line" d="M 10 600  600 600" />
        <path class="line04 line" d="M 10 800  600 800" />
        <path class="line05 line" d="M 10 1000  600 1000" />
        <path class="line06 line" d="M 10 1200  600 1200" />
        <text class="text01" x="30" y="190">2018</text>
        <text class="text02" x="30" y="390">2019</text>
        <text class="text03" x="30" y="590">2020</text>
        <text class="text04" x="30" y="790">2021</text>
        <text class="text05" x="30" y="990">2022</text>
        <text class="text06" x="30" y="1190">2023</text>
        <path class="theLine" 
              d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1200"
              fill="none" stroke="white" stroke-width="10px" />
  
        <circle class="ball ball01" r="20" cx="50" cy="100"></circle>
        <circle class="ball ball02" r="20" cx="278" cy="201"></circle>
        <circle class="ball ball03" r="20" cx="327" cy="401"></circle>
        <circle class="ball ball04" r="20" cx="203" cy="601"></circle>
        <circle class="ball ball05" r="20" cx="130" cy="796"></circle>
        <circle class="ball ball06" r="20" cx="300" cy="1001"></circle>
        <circle class="ball ball07" r="20" cx="135" cy="1200"></circle>
      </svg>
    </div>
    <div class="content">
      <section style="background-color: aqua;" id="about-page1"></section>
      <section style="background-color: blue;" id="about-page2"></section>
      <section style="background-color: red;" id="about-page3"></section>
      <section style="background-color: yellow;" id="about-page4"></section>
      <section style="background-color: green;" id="about-page5"></section>
      <section style="background-color: purple;" id="about-page6"></section>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default {
  props: ['topnavHeight'],
  mounted() {

    gsap.to('.content', {
      opacity: 1,
      delay: 0.5,
      duration: 1,
      onComplete: () => {
        gsap.to('.svg-container', {
          opacity: 1,
          y: 0,
          delay: 0.5,
        })
      }
    })

    const theLine = document.querySelector(".theLine");
    const pathLength = theLine.getTotalLength();


    theLine.style.strokeDasharray = pathLength;
    theLine.style.strokeDashoffset = pathLength;


    gsap.to(theLine, {
      strokeDashoffset: 0,
      duration: 4,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        start: "top top",
        end: "bottom bottom",
      }
    });

    // Move the ball along the path
    // gsap.to(".ball01", {
    //   motionPath: {
    //     path: theLine,
    //     align: theLine,
    //     alignOrigin: [0.5, 0.5],
    //   },
    //   duration: 4,
    //   scrollTrigger: {
    //     trigger: "#svg",
    //     scrub: true,
    //     start: "top center",
    //     end: "bottom center",
    //   }
    // });

    const pulses = gsap.timeline({
      defaults: {
        scale: 2,
        autoAlpha: 1,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
      }
    })
    .to(".ball02, .text01", {}, 0.76)
    .to(".ball03, .text02", {},  1.29)
    .to(".ball04, .text03", {},  1.93)
    .to(".ball05, .text04", {},  2.63)
    .to(".ball06, .text05", {},  3.63)
    .to(".ball07, .text06", {}, 6.5);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        start: "top top",
        end: "bottom bottom",
      }
    })
    .to(".ball01", {autoAlpha:1, duration:0.5}, 0)
    .from(".theLine", {drawSVG:0, duration:6}, 0)
    .to(".ball01", {motionPath:{
      path:".theLine",
      align:".theLine",
      alignOrigin:[0.5, 0.5],
    }, duration:7}, 0).add(pulses, 0);
  }
};
</script>

<style scoped>
.about {
  color: white;
  
}
.about section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-section {
  margin: 0 auto 0;
}
.content img {
  width: 100%;
}
.svg-container {
  height: 100vh;
  width: 30%;
  background: black;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100px);
}
svg {
  
  top: 13%;
  left: 0;
  position: fixed;
  overflow: visible;
  height: 100%;
  width: auto;
}

.ball {
  fill: white;
  visibility: hidden;
}

.line {
  fill: none;
  stroke: white;
  stroke-width: 2px;
}

text {
  fill: white;
  font-size: 15px;
  font-family: "Signika Negative", sans-serif;
  visibility: hidden;
}

.content {
  opacity: 0;
}
</style>
