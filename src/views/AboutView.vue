<template>
  <div class="about" :style="{marginTop: topnavHeight + 6 +'px'}">
    <h1>This is an about page</h1>
    <div class="box red-box">
      
    </div>
    <div class="box blue-box">

    </div>
    <div class="box green-box c"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default {
  props: ['topnavHeight'],
  mounted() {

    gsap.registerPlugin(ScrollTrigger);
    this.animation = gsap.to('.c', {
      scrollTrigger: {
        trigger: '.c',
        toggleActions: 'play none none reverse',
      },
      x: 400,
      duration: 2,
      ease: 'ease',
    });
  },
  beforeUnmount() {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power2.inOut',
      overwrite: true,  
    });
    if (this.gsapContext) {
      this.gsapContext.revert();
    }
    this.animation.kill();
  },
}
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  margin: 100px;
  margin-bottom: 1000px;
}
.red-box {
  background-color: red;
}
.blue-box {
  background-color: blue;
}
.green-box {
  background-color: green;
}
.about {
  margin: 25px;
  background-image: url('../assets/glass.png');
}
</style>

