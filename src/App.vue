<template>
  <app-layout>
    <router-view/>
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue';

export default {
  components: {
    AppLayout
  }
}

</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
