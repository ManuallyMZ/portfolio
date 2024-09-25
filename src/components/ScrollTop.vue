<template>
  <div class="scroll-top" @click="handleScrollTopClick">
    <img src="../assets/SVG/ScrollTop.svg" alt="GoTop">
  </div>
</template>

<script>
export default {
  methods: {
    handleScrollTopClick() {
      this.$emit('goTop')
    }
  }
}
</script>

<style>
.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(71, 70, 143, 0.44);
  box-shadow: 0 4px 30px rgba(104, 3, 236, 0.3);
  backdrop-filter: blur(0.6px);
  -webkit-backdrop-filter: blur(0.6px);
  box-sizing: border-box;
  cursor: pointer;
}
.scroll-top img {
  width: 100%;
}
</style>