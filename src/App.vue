<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="flex flex-row">
    <nav>
      <NavBar />
    </nav>
    <RouterView />
  </div>
</template>
