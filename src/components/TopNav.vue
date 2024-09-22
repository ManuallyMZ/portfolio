<template>
  <div class="top-nav">
    <ul>
      <li><router-link :to="{name: 'home'}">Home</router-link></li>
      <li><router-link :to="{name: 'about'}">About</router-link></li>
      <li><router-link :to="{name: 'contact'}">Contact</router-link></li>
      <li><router-link :to="{name: 'blog'}">Blog</router-link></li>
      <li><router-link :to="{name: 'careers'}">Careers</router-link></li>
      <li><router-link :to="{name: 'shop'}">Shop</router-link></li>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Keep navbar above the fullPage sections */
}
.top-nav ul {
  display: flex;
  list-style: none;

  gap: 20px;
  /* background: linear-gradient(to left, #000033, #000066, #330066, #660099, #9933cc); */
  background: linear-gradient(to left, #000033, #000066, #220044, #440077, #550099);
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
  color: #76cdf5;
  cursor: pointer;
}
</style>