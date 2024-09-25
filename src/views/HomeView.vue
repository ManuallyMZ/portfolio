<template>
  <div class="home">

    <section id="home-page1" class="home1" >
      <div class="column2">
        <div class="page1left">
          <h2>Welcome to the ultimate website</h2>
          <h3>Written by <b>Nima R</b></h3>
        </div>
      </div>
      <div class="column2">
        <div class="page1right">
          <div class="page1image">
            <img src="../assets/images/mountain.jpg" alt="Nima R">
          </div>
        </div>
      </div>
    </section>

    <section id="home-page2" class="home2">
      <div class="column2 page2">
        <div class="glassleft glass glass-color">
          <div class="page2left">
          <h2>My name is Nima</h2>
          <h3>I am a web developer</h3>
          <h4>I learned web development in 2024 and doing some work with Vue framework!</h4>
          <h4>You can learn more about me <router-link :to="{name: 'about'}" class="homeLink">Here!</router-link></h4>
        </div>
        </div>
      </div>

      <div class="column2 page2">
        <div class="glassright glass glass-color">
        <div class="page2right">
          <h2>You can check some of my projects in my <a href="https://github.com/ManuallyMZ" target="_blank" class="homeLink">Github</a> page</h2>
          <h3>and I'm always open to new projects</h3>
          <h4>You can contact me in the <router-link :to="{name: 'contact'}" class="homeLink">Contact</router-link> page</h4>
        </div>
      </div>
      </div>
    </section>
    <section id="home-page3" class="home3">
      <div class="column3 page4">
        <div class="page4left">
          <h2>Check out some of my Merchandise!</h2>
        </div>
      </div>
      <div class="column3 page3">
        <h2 class="page3header">Want More?</h2>
        <div class="page4center">
          <h2>Subscribe to my newsletter</h2>
          <h2><router-link :to="{name: 'form'}" class="homeLink">Here!</router-link></h2>
        </div>
      </div>
      <div class="column3 page4">
        <div class="page4right">
          <h2>Visit the Blog!</h2>
        </div>
      </div>
    </section>

    <section id="ex1" class="home-skills">
      <Skills />
    </section>

    <section id="home-page4" class="home4">
      <div class="page5">
        <ContactModal />
      </div>
    </section>
    <div class="home-footer"></div>
    <transition name="fade" mode="out-in">
      <ScrollTop @goTop="handleGoTop" v-if="isScrollDown"/>
    </transition>
  </div>
</template>

<script>
import Lenis from 'lenis'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ContactModal from '../components/ContactModal.vue'
import ScrollTop from '../components/ScrollTop.vue'
import Skills from '../components/Skills.vue'

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HomeView',
  components: {
    ContactModal,
    ScrollTop,
    Skills
  
  },
  data() {
    return {
      totalScrollHeight: 0,
      lenis: null,
      isScrollDown: false,
      constrain: 15,
    }
  },
  methods: {
    handleGoTop() {
      this.lenis.scrollTo(0, {
        duration: 2,
        ease: 'power2.inOut'
      });
    },
    checkScrollPosition() {
      const scrollY = this.lenis.scroll;
      this.isScrollDown = scrollY > 2000;
    },
  },
  computed: {
    calculateScrollHeight() {
      const viewportHeight = window.innerHeight;

      const home1Start = 0.40 * viewportHeight;
      const home1End = 0.70 * viewportHeight;
      const home1Height = home1End - home1Start;

      const home2ST1Height = viewportHeight;

      const home2ST2Height = viewportHeight + 1;

      const home2ST3Height = viewportHeight * 1.50;

      const home3ST1Height = viewportHeight;

      const home3ST2Height = viewportHeight * 5 - 3;

      const totalHeight = home1Height + home2ST1Height + home2ST2Height + home2ST3Height + home3ST1Height + home3ST2Height;

      return totalHeight;
    }
  },
  created() {
    this.lenis = new Lenis(
      { 
        lerp: 0.035,
        smoothTouch: false,
      }
    );

    this.lenis.on('scroll', () => {
      this.checkScrollPosition();
    })

    this.lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      this.lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    
  },
  mounted() {

    this.totalScrollHeight = this.calculateScrollHeight;
    this.gsapContext = gsap.context(() => {
      const bgtl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: this.totalScrollHeight,
          scrub: 1.5,
          
        }
      })
      bgtl.to('body', {
        backgroundPositionY : "-20vh",
        ease: 'ease',
      })
      this.animation = gsap.fromTo('.home1', {
        x: 200,
        opacity: 0,},
        {
        x: 0,
        opacity: 1,
        delay: 0.5,
        duration: 2,
        ease: 'ease',
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.home1',
          start: '40% 30%',
          end: '70%',
          pin: true,
          pinSpacing: 0,
          scrub: 1.5,
          onEnter: () => gsap.set('.home1', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.home1', {left: '0px'}),
        },
      })
      tl.to('.page1left', {
        x: "-300",
        opacity: 0,
        ease: 'ease',
      })
      .to(".page1right", {
        x: "300",
        opacity: 0,
        ease: 'ease',
      }, 0)

      const tlPage2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home2",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          pinSpacing: false,
          onEnter: () => gsap.set('.page2', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page2', {left: '0px'}),
        }
      });
      tlPage2.to(".page2", {
        opacity: 1,
        y: 0,
        duration: 1
      })
      const tlpageholder = gsap.timeline({
        scrollTrigger: {
          trigger: ".home2",
          start: "1px top",
          end: "+=100%",
          scrub: 1.5,
          pin: true,
          pinSpacing: false,
          onEnter: () => gsap.set('.page2', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page2', {left: '0px'}),
        }
      })
      
      const tlpager = gsap.timeline({
        scrollTrigger: {
          trigger: ".home2",
          start: "3px top",
          end: "+150%",
          pin: true,
          pinSpacing: true,
          onEnter: () => gsap.set('.page2', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page2', {left: '0px'}),
          scrub: 1.5
        }
      })
      tlpager.to(".glassright", {
        rotate: 35,
        x: "+100vw",
        opacity: 0,
        duration: 1
      })
      .to(".glassleft", {
        rotate: -35,
        x: "-100vw",
        opacity: 0,
        duration: 1
      },"<")

      const page3tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home3",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          onEnter: () => gsap.set('.page3', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page3', {left: '0px'}),
        }
      })
      page3tl.to(".page4left", {
        x: "0",
      })
      .to(".page4right", {
        x: "0",
      },0)
      .to(".page4center",{
        y: "10vh",
      },'<')

      const transtl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home3",
          start: "3px top",
          end: "+300% bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
          onEnter: () => gsap.set('.page3', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page3', {left: '0px'}),
        }
      })
      transtl.to(".page3header", {
        y: "-100vh",
        opacity: 0,
        duration: 1,
      })
      .to(".page4left", {
        x: "-100vw",
        opacity: 0,
        duration: 1,
      },)
      .to(".page4right", {
        x: "100vw",
        opacity: 0,
        duration: 1,
      }, "<")
      .to(".page4center", {
        opacity:0
      },)
      
      const canvtl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-skills",
          start: "3px top",
          end: "+300% bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
          onEnter: () => gsap.set('.page4', {left: '0px'}),
          onUpdate: (self) => {
            gsap.set(self.trigger, {left: '0px'});
          },
          onLeave: () => gsap.set('.page4', {left: '0px'}),
        }
      })
      const contl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home4",
          start: "top top",
          end: "199%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          onEnter: () => gsap.set('.page4', {left: '0px'}),
          onUpdate: (self) => gsap.set(self.trigger, {left: '0px'}),
          onLeave: () => gsap.set('.page4', {left: '0px'}),
        }
      })
      contl.to(".page5", {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          gsap.timeline({
          })
          .to(".contactHeader",
            {
              opacity: 1,
              duration: 1,
            })
          .to(".contactTelegram", {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              document.querySelector(".contactTelegramLink").style.cursor = "pointer";
            }
          })
          .to(".contactGithub", {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              document.querySelector(".contactGithubLink").style.cursor = "pointer";
            }
          })
          .to(".contactLinkedin", {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              document.querySelector(".contactLinkedinLink").style.cursor = "pointer";
            }
          })
          .to(".contactEmail", {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              document.querySelector(".contactEmailLink").style.cursor = "pointer";
            }
          })
        }
      })
    });
  },
  beforeUnmount() {
    this.lenis.scrollTo(0, {
        duration: 2,
        ease: 'power2.inOut'
      });
    if (this.gsapContext) {
      this.gsapContext.revert();
    }
    this.animation.kill();
    if (this.lenis) {
      this.lenis.destroy();
    }
  },
  
}
</script>


<style scoped>
.home {
  user-select: none;
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari, Chrome */
  -ms-user-select: none; /* IE, Edge */
  color: aliceblue;
}
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homeLink:visited, .homeLink:link{
  color: #299bff;
  cursor: pointer;
}
.homeLink:hover, .homeLink:active{
  color: #34c0eb;
}
.column2 {
  width: 50vw;
}
.column3 {
  width: 33vw;
}
.home1, .page1 {
  margin: 0;
  padding: 0;
  left: 0;
  position: relative;
}
.page1image {
  width: 30%;
  height: 30%;
  min-height: 30px;
  min-width: 30px;
  margin: 0 auto;
  box-sizing:border-box;
}
.page1image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 4px 30px rgba(182, 3, 236, 0.3);
}
.page2 {
  display: flex;
  opacity: 0;
  transform: translateY(100px);
  align-items: center;
  justify-content: center;
}
.page4left {
  transform: translateX(-100vw);
}
.page4right {
  transform: translateX(100vw);
}
.page4center {
  transform: translateY(100vh);
  line-height: 0.3;
}
.page5 {
  display: flex;
  opacity: 0;
  width: 100vw;
  justify-content: center;
}

.home-footer {
  height: 1vh;
  width: 100vw;
}

</style>
