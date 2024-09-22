<template>
  <div class="careers">
    <div class="careers-showcase">
      <CareerCard v-for="career in careerList" :key="career.id" :career="career"/>
    </div>
  </div>
</template>

<script>
import CareerCard from '@/components/CareerCard.vue';

export default {
  components: {
    CareerCard,
  },
  props: ['topnavHeight'],
  data() {
    return {
      careerList: [
        {
          name: 'shoghl1',
          id: 1,
          h: '100px'
        },
        {
          name: 'shogle2',
          id: 2,
          h: '300px'
        },
        {
          name: 'shogl3',
          id: 3,
          h: '200px'
        },
        {
          name: 'shoghl1',
          id: 4,
          h: '500px'
        },
        {
          name: 'shogle2',
          id: 5,
          h: '600px'
        },
        {
          name: 'shogl3',
          id: 6,
          h: '300px'
        },
        {
          name: 'shoghl1',
          id: 7,
          h: '200px'
        },
        {
          name: 'shogle2',
          id: 8,
          h: '50px'
        },
        {
          name: 'shogl3',
          id: 9,
          h: '300px'
        },
        {
          name: 'shoghl1',
          id: 10,
          h: '400px'
        },
        {
          name: 'shogle2',
          id: 11,
          h: '200px'
        },
        {
          name: 'shogl3',
          id: 12,
          h: '100px'
        }
      ]
    }
  }
}
</script>

<style>
.careers {
  padding: 20px;
  margin-top: 70px;
  height: 100%;
  box-sizing: border-box;

}
.career-card {
}
.careers-showcase {
  columns: 300px;
  box-sizing: border-box;
  height: 500vh;
  flex-flow: column;
}
.career-card img {
  width: 100%;
  margin-bottom: 1px;
}
.career-card p {
  margin: 0;
}
</style>