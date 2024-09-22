<template>
  <router-link class="career-link" :to="{ name: 'CareerDetails' , params: { id : career.id }}">
    <div class="career-card">
      <span>@ {{ career.time}} on {{ career.date }}</span>
      <h4>{{ career.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CareerCard',
  props: {
    career: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped>
.career-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.career-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.career-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
