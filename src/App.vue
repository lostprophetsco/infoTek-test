<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="/">Каталог книг</a>
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link">Каталог</router-link>
          <router-link to="/top-authors" class="nav-link">ТОП авторы</router-link>
          <template v-if="isAuthenticated">
            <span class="nav-link text-light">{{ user?.username }}</span>
            <a href="#" class="nav-link" @click.prevent="logout">Выйти</a>
          </template>
          <router-link v-else to="/login" class="nav-link">Войти</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from './composables/useAuth'

const { isAuthenticated, user, logout } = useAuth()
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
