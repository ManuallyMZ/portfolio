<template>
  <TopNav @update:height="receiveData"/>
  <div class="router-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" :topnavHeight="topnavHeight"/>
      </transition>
    </router-view>
  </div>
  <div class="web-footer">
    <p>© 2024 Nima Ramezani</p>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import NProgress from 'nprogress';
export default {
  name: 'App',
  data() {
    return {
      topnavHeight: 0
    }
  },
  components : {
    TopNav,
  },
  created() {
    NProgress.configure({
      minimum: 0.0,
      easing: 'ease',
      speed: 200,
      showSpinner: false,
    });
  },
  mounted() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPercent = (scrollY / (scrollHeight - clientHeight));
      NProgress.set(scrollPercent-0.001);
    });
  },
  methods: {
    receiveData(data) {
      this.topnavHeight = data;
    },

  }
}
</script>
<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.router-wrapper {
}

/*** TRANSITIONS ***/

.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#nprogress .bar {
  background: linear-gradient(to right, hsl(276, 100%, 20%), hsl(276, 100%, 25%), hsl(276, 100%, 30%), hsl(276, 100%, 40%), hsl(290, 100%, 50%));
  /* box-shadow: 100px 100px 5px linear-gradient(to right, #00ffd5, #ff0000, #5800af, #9000ff, #550099); */
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
#nprogress .peg {
  width: 100%;
  box-shadow: 0 0 6px rgb(141, 8, 250), 0 0 3px rgb(145, 17, 250);
  opacity: 1.0;
  transform: rotate(0deg);
}
.web-footer {
  /* background-image: rgba(0,0,255,1);  */
  background: #141526;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  padding-left: 10vw;
  align-items: center;
  user-select: none;
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari, Chrome */
  -ms-user-select: none; /* IE, Edge */
  color: white;
  font-size: 14px;
}
</style>
