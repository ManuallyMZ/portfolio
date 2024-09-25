<template>
  <div class="form-vw" :style="{marginTop: topnavHeight +'px'}">
    <div class="form-bg" :style="{ height: `calc(100vh - ${topnavHeight}px)`}">
      <!-- `calc(100vh - ${topnavHeight}px)`  -->
      <div class="form-text">
        <h1>Complete the Form</h1>
        <h3 :style="{ marginTop: '0' }"> to be contacted by me</h3>
        <div>
          <button @click="isForm = true" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class="form-button">GO!</button>
        </div>
      </div>
      <div v-if="isForm">
        <FormModal @close="handleClose" />
      </div>
    </div>
  </div>
</template>

<script>
import FormModal from '../components/FormComponents/FormModal.vue'
import { gsap } from 'gsap'

export default {
  components: {
    FormModal
  },
  props: ['topnavHeight'],
  data() {
    return {
      isForm: false,
      formButton: null
    }
  },
  methods: {
    handleClose() {
      this.isForm = false
    },
    handleMouseEnter(){
      if (this.formButton){
        this.formButton.kill();
      }
      this.formButton = gsap.context(() => {
        gsap.to(".form-button",
          {
            duration: 0.5,
            scale: 1.2
          }
        )
      })
    },
    handleMouseLeave(){
      this.formButton.kill();
      this.formButton = gsap.context(() => {
        gsap.to(".form-button",
          {
            duration: 0.5,
            scale: 1,
          }
        )
      })

    }

  }
}
</script>

<style>

.form-vw {
  user-select: none;
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari, Chrome */
  -ms-user-select: none; /* IE, Edge */
  color: bisque;
  display: flex;
  justify-content: center;
}
.form-bg {
  display: flex;
  flex-flow:column;
  justify-content: center;
  position: relative;
  background: rgba(20, 21, 38, 0.9);
  width: 85%;
  max-width: 650px;
}
.form-text{
  display: flex;
  flex-flow: column;
  height: 40%;
}
.form-button {
  background: linear-gradient( #310194 0%, #1e173c 100%);
  box-shadow: 0px 1px 15px rgba(111, 0, 255, 0.3);
}
</style>