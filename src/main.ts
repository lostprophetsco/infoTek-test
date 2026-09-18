import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useAuth } from './composables/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/books/create',
      name: 'book-create',
      component: () => import('./views/BookForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/books/:id/edit',
      name: 'book-edit',
      component: () => import('./views/BookForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/top-authors',
      name: 'top-authors',
      component: () => import('./views/TopAuthors.vue')
    }
  ]
})

// Route guard
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)

// Инициализация авторизации
const { initAuth } = useAuth()
initAuth()

app.mount('#app')
