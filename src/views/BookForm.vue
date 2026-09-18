<template>
  <div class="book-form">
    <h2>{{ isEdit ? 'Редактировать книгу' : 'Добавить книгу' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Название *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="year" class="form-label">Год выпуска *</label>
        <input
          id="year"
          v-model.number="form.year"
          type="number"
          class="form-control"
          required
          min="1000"
          max="9999"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Описание</label>
        <textarea
          id="description"
          v-model="form.description"
          class="form-control"
          rows="3"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input
          id="isbn"
          v-model="form.isbn"
          type="text"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="authors" class="form-label">Авторы *</label>
        <div v-for="(_, index) in form.author_ids" :key="index" class="mb-2">
          <select
            v-model="form.author_ids[index]"
            class="form-select"
            required
          >
            <option value="">Выберите автора</option>
            <option v-for="author in authors" :key="author.id" :value="author.id">
              {{ author.full_name }}
            </option>
          </select>
          <button
            v-if="form.author_ids.length > 1"
            type="button"
            class="btn btn-sm btn-outline-danger mt-1"
            @click="removeAuthor(index)"
          >
            Удалить
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="addAuthor"
        >
          + Добавить автора
        </button>
      </div>

      <div class="mb-3">
        <label for="cover" class="form-label">Обложка *</label>
        <input
          id="cover"
          type="file"
          class="form-control"
          accept="image/*"
          required
          @change="handleFileChange"
        />
      </div>

      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-primary me-2" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ isEdit ? 'Сохранить' : 'Создать' }}
        </button>
        <router-link to="/" class="btn btn-secondary">Отмена</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiClient } from '../api/client'
import { useAuth } from '../composables/useAuth'
import type { AuthorShort } from '../types/api'

const router = useRouter()
const route = useRoute()
const { isUser } = useAuth()

const isEdit = computed(() => !!route.params.id)
const bookId = computed(() => route.params.id ? parseInt(route.params.id as string) : null)

const form = ref({
  title: '',
  year: new Date().getFullYear(),
  description: '',
  isbn: '',
  author_ids: [0] as number[],
  cover: null as File | null
})

const authors = ref<AuthorShort[]>([])
const loading = ref(false)
const error = ref('')

const loadAuthors = async () => {
  try {
    const response = await apiClient.getAuthors()
    authors.value = response.data.items
  } catch (e) {
    console.error('Failed to load authors:', e)
  }
}

const loadBook = async () => {
  if (!bookId.value) return

  try {
    const response = await apiClient.getBook(bookId.value)
    const book = response.data
    form.value = {
      title: book.title,
      year: book.year,
      description: book.description,
      isbn: book.isbn,
      author_ids: book.authors.map(a => a.id),
      cover: null
    }
  } catch (e) {
    error.value = 'Не удалось загрузить книгу'
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.cover = target.files[0]
  }
}

const addAuthor = () => {
  form.value.author_ids.push(0)
}

const removeAuthor = (index: number) => {
  form.value.author_ids.splice(index, 1)
}

const handleSubmit = async () => {
  if (!isUser.value) {
    error.value = 'Только авторизованные пользователи могут создавать/редактировать книги'
    return
  }

  if (!form.value.cover) {
    error.value = 'Необходимо загрузить обложку'
    return
  }

  if (form.value.author_ids.some(id => id === 0)) {
    error.value = 'Выберите всех авторов'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('year', form.value.year.toString())
    if (form.value.description) formData.append('description', form.value.description)
    if (form.value.isbn) formData.append('isbn', form.value.isbn)
    formData.append('author_ids', JSON.stringify(form.value.author_ids))
    formData.append('cover', form.value.cover)

    if (isEdit.value && bookId.value) {
      await apiClient.updateBook(bookId.value, formData)
    } else {
      await apiClient.createBook(formData)
    }

    await router.push('/')
  } catch (e) {
    error.value = 'Ошибка при сохранении книги'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadAuthors()
  if (isEdit.value) {
    await loadBook()
  }
})
</script>
