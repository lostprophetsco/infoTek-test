<template>
  <div class="login">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Вход</h3>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Имя пользователя</label>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>

              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Войти
              </button>
            </form>

            <p class="text-center mt-3 text-muted">
              <small>Для теста: admin / admin</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await login(form.value)
    if (success) {
      router.push('/')
    } else {
      error.value = 'Неверные учетные данные'
    }
  } catch (e) {
    error.value = 'Ошибка при входе'
  } finally {
    loading.value = false
  }
}
</script>
