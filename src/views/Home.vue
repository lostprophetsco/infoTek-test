<template>
  <div class="home">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Каталог книг</h1>
      <router-link v-if="isUser" to="/books/create" class="btn btn-primary">
        + Добавить книгу
      </router-link>
    </div>

    <!-- Фильтры -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Поиск</label>
            <input
              v-model="filters.search"
              type="text"
              class="form-control"
              placeholder="Название книги..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Год</label>
            <select
              v-model="filters.year"
              class="form-select"
              @change="loadBooks"
            >
              <option :value="null">Все годы</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Автор</label>
            <select
              v-model="filters.author_id"
              class="form-select"
              @change="loadBooks"
            >
              <option :value="null">Все авторы</option>
              <option v-for="author in authors" :key="author.id" :value="author.id">
                {{ author.full_name }}
              </option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <!-- Список книг -->
    <div v-else-if="books.length > 0">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        <div v-for="book in books" :key="book.id" class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text text-muted mb-2">
                <small>{{ book.year }}</small>
              </p>
              <p class="card-text">
                <small>{{ book.description }}</small>
              </p>
              <p class="card-text mb-2">
                <strong>Автор: </strong>
                <span v-for="(author, index) in book.authors" :key="author.id">
                  {{ author.full_name }}<template v-if="index < book.authors.length - 1">, </template>
                </span>
              </p>
              <p v-if="book.isbn" class="card-text">
                <small class="text-muted">ISBN: {{ book.isbn }}</small>
              </p>
              <div v-if="isUser" class="mt-auto pt-2">
                <router-link :to="`/books/${book.id}/edit`" class="btn btn-sm btn-outline-primary me-2">
                  Редактировать
                </router-link>
                <button class="btn btn-sm btn-outline-danger" @click="handleDelete(book.id)">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пагинация -->
      <nav v-if="pagination.total_pages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: pagination.page === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(pagination.page - 1)">Предыдущая</a>
          </li>
          <li
            v-for="page in pagination.total_pages"
            :key="page"
            class="page-item"
            :class="{ active: page === pagination.page }"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: pagination.page === pagination.total_pages }">
            <a class="page-link" href="#" @click.prevent="changePage(pagination.page + 1)">Следующая</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Пустой результат -->
    <div v-else class="text-center py-5">
      <p class="text-muted">Книги не найдены</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { apiClient } from '../api/client'
import { useAuth } from '../composables/useAuth'
import type { Book, AuthorShort, Pagination } from '../types/api'

const { isUser } = useAuth()

const books = ref<Book[]>([])
const authors = ref<AuthorShort[]>([])
const loading = ref(true)
const pagination = ref<Pagination>({
  total: 0,
  page: 1,
  per_page: 20,
  total_pages: 1
})

const filters = ref({
  search: '',
  year: null as number | null,
  author_id: null as number | null
})

const availableYears = computed(() => {
  const years = [...new Set(books.value.map(book => book.year))]
  return years.sort((a, b) => b - a)
})

let searchTimeout: number | null = null

const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = window.setTimeout(() => {
    loadBooks()
  }, 500)
}

const loadBooks = async () => {
  loading.value = true
  try {
    const params: Record<string, string | number> = {
      page: pagination.value.page,
      'per-page': pagination.value.per_page
    }

    if (filters.value.search) {
      params.search = filters.value.search
    }
    if (filters.value.year) {
      params.year = filters.value.year
    }
    if (filters.value.author_id) {
      params.author_id = filters.value.author_id
    }

    const response = await apiClient.getBooks(params)
    books.value = response.data.items
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Failed to load books:', error)
  } finally {
    loading.value = false
  }
}

const loadAuthors = async () => {
  try {
    const response = await apiClient.getAuthors()
    authors.value = response.data.items
  } catch (error) {
    console.error('Failed to load authors:', error)
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > pagination.value.total_pages) return
  pagination.value.page = page
  loadBooks()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    year: null,
    author_id: null
  }
  pagination.value.page = 1
  loadBooks()
}

const handleDelete = async (id: number) => {
  if (!confirm('Вы уверены, что хотите удалить эту книгу?')) return

  try {
    await apiClient.deleteBook(id)
    await loadBooks()
  } catch (error) {
    console.error('Failed to delete book:', error)
    alert('Ошибка при удалении книги')
  }
}

onMounted(async () => {
  await Promise.all([loadBooks(), loadAuthors()])
})
</script>
