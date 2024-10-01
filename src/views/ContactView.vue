<template>
  <div class="contact-vw" :style="{marginTop: topnavHeight +'px'}">
    <div class="contact-bg" :style="{ height: `calc(100vh - ${topnavHeight}px - 40px)`}">
      <ContactModal class="cmodal"/>
    </div>
  </div>
</template>

<script>
import ContactModal from '@/components/ContactModal.vue';
import gsap from 'gsap';
export default {
  props: ['topnavHeight'],
  components: {
    ContactModal
  },
  mounted() {
    this.contactContext = gsap.context(() => {
      gsap.timeline({})
      .to(".contactHeader",
        {
          opacity: 1,
          duration: 1,
        })
      .to(".contactTelegram", {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          document.querySelector(".contactTelegramLink").style.cursor = "pointer";
        }
      })
      .to(".contactGithub", {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          document.querySelector(".contactGithubLink").style.cursor = "pointer";
        }
      })
      .to(".contactLinkedin", {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          document.querySelector(".contactLinkedinLink").style.cursor = "pointer";
        }
      })
      .to(".contactEmail", {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          document.querySelector(".contactEmailLink").style.cursor = "pointer";
        }
      })
    })
  },
  beforeUnmount() {
    if (this.contactContext) {
      this.contactContext.revert();
    }
  }
}
</script>

<style>
.contact-vw {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact-bg {
  display: flex;
  flex-flow:column;
  justify-content: center;
  position: relative;
  background: #31346691;
  width: 85%;
  max-width: 650px;
  box-shadow: 0 4px 30px rgba(108, 9, 221, 0.836);
}
.cmodal {
  margin: 0 auto;
}
</style>