<!-- frontend/src/views/HomeView.vue -->
<template>
  <div class="home">
    <Hero />
    <Product />
    <Collection />
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import Product from '../components/Product.vue'
import Collection from '../components/Collection.vue'
</script>