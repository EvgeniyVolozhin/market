<!-- frontend/src/App.vue -->
<template>
  <div id="app">
    <Header/>
    <main>
      <router-view />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
}
</style>