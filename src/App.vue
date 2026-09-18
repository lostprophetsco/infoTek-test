<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="/">Каталог книг</a>
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link">Каталог</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
