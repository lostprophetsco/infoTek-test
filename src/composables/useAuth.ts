import { ref, computed } from 'vue'
import { apiClient } from '../api/client'
import type { LoginRequest, User } from '../types/api'

const token = ref<string | null>(localStorage.getItem('token'))
const user = ref<User | null>(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)
  const isUser = computed(() => user.value?.role === 'user')

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiClient.login(credentials)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', response.data.token)
      apiClient.setToken(response.data.token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    apiClient.clearToken()
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      apiClient.setToken(savedToken)
      // В реальном приложении здесь нужно запросить данные пользователя
      user.value = { id: 1, username: 'admin', role: 'user' }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    isUser,
    login,
    logout,
    initAuth
  }
}
