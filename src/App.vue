<template>
  <div id="app">
    <products />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import products from './components/Products';
export default {
  name: 'App',
  components: {
    products
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
