<template>
  <swiper
    ref="outerSwiper"
    :direction="'vertical'"
    :slidesPerView="1"
    :spaceBetween="30"
    :speed="1000"
    :mousewheel="true"
    :keyboard="{
      enabled: true,
    }"
    :autoHeight="true"
    :pagination="{
      dynamicBullets: true,
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="blog-slide">
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" class="blog-img">
        <div class="blog-fader"></div>
        <h2>test</h2>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="blog-slide">
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" class="blog-img">
        <div class="blog-fader"></div>
        <h2>test</h2>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="blog-slide">
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" class="blog-img">
        <div class="blog-fader"></div>
        <h2>test</h2>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="blog-slide">
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" class="blog-img">
        <div class="blog-fader"></div>
        <h2>test</h2>
      </div>
    </swiper-slide>

    <swiper-slide>
      <swiper
        ref="innerSwiper"
        :direction="'horizontal'"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          'margin-top': '0',
        }"
        :speed="1000"
        :parallax="true"
        :pagination="{
          dynamicBullets: true,
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="horizontal-swiper"
      >
        <div
          class="parallax-bg"
          data-swiper-parallax="-23%"
        ></div>

        <swiper-slide>
          <div class="title" data-swiper-parallax="-300">Slide 1</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
              velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
              libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div> 
        </swiper-slide>
        
        <swiper-slide>
          <div class="title" data-swiper-parallax="-300">Slide 2</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
              velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
              libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div> 
        </swiper-slide>

        <swiper-slide>
          <div class="title" data-swiper-parallax="-300">Slide 3</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
              velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
              libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </swiper-slide>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  import { Keyboard, Navigation, Parallax, Mousewheel, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Keyboard, Navigation, Parallax, Mousewheel, Pagination],
      };
    },
}
</script>

<style scoped>

.swiper {
  margin-top: 60px;
  width: 100vw;
  height: 90vh;
  background: #141526;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  color: pink;
}

.blog-img {
  position: absolute;
  top: 0;
  display: block;
  width: 100vw;
  height: 100%;
  z-index: -3;
}
.blog-fader {
  position: absolute;
  top: 0;
  display: block;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.blog-slide {
  display: block;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  color: pink;
}
.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 130%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(to left,rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url('https://swiperjs.com/demos/images/nature-1.jpg');
}
.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}

.swiper-slide .subtitle {
  font-size: 21px;
}

.swiper-slide .text {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}
</style>
