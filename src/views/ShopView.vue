<template>
  <div class="shop">
    <div class="box1 box" id="#box1"></div>
    <div class="box2 box" id="#box2"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
export default {
  mounted() {
    gsap.timeline( )
      .to('.box1', {
        opacity: 0.75,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "back.in(3)",
      })
      .to('.box2', {
        opacity: 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
      })
  }
}
</script>

<style>
.box {
  background: green;
  margin: 200px 100px;
  height: 100px;
  width: 100px;
  opacity: 1;
}
</style>