<template>
  <div class="top-nav">
    <ul>
      <li><router-link :to="{name: 'home'}">Home</router-link></li>
      <li><router-link :to="{name: 'about'}">About</router-link></li>
      <li><router-link :to="{name: 'contact'}">Contact</router-link></li>
      <li><router-link :to="{name: 'form'}">Form</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    const topnavHeight = this.$el.offsetHeight;
    this.$emit('update:height', topnavHeight);
  }
}
</script>

<style>
.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.top-nav ul {
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 20px;
  /* background: linear-gradient(to left, #000033, #000066, #330066, #660099, #9933cc); */
  background: linear-gradient(to left, #00005e, #000066, #220044, #430077, #540099);
  margin: 0;
  padding: 10px 25px;
}
.top-nav li {
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: white;
  font-family: 'Roboto', sans-serif;
}
.top-nav li a {

  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: bold;
  padding: 10px 20px;
  color: #c587ff;
  cursor: pointer;
}

.top-nav li a.router-link-exact-active {
  color: #f311e8;
  cursor: pointer;
  text-shadow: 0 2px 25px rgba(255,255,255,0.5);
}
</style>