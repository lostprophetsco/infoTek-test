<template>
  <div class="top-authors">
    <h1>ТОП 10 авторов по годам</h1>

    <div class="card mb-4">
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-md-3">
            <label for="year" class="form-label">Год</label>
            <select
              id="year"
              v-model.number="selectedYear"
              class="form-select"
              @change="loadReport"
            >
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else-if="report" class="card">
      <div class="card-body">
        <h5 class="card-title">ТОП 10 авторов за {{ report.year }} год</h5>

        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Автор</th>
                <th>Количество книг</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in report.items" :key="item.author_id">
                <td>
                  <span class="badge" :class="getBadgeClass(item.rank)">
                    {{ item.rank }}
                  </span>
                </td>
                <td>{{ item.full_name }}</td>
                <td>{{ item.books_count }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="report.items.length === 0" class="text-center py-4">
          <p class="text-muted">Нет данных за выбранный год</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiClient } from '../api/client'
import { useBookYears } from '../composables/useBookYears'
import type { TopAuthor } from '../types/api'

const { availableYears } = useBookYears()

const selectedYear = ref(0)
const report = ref<{ year: number; items: TopAuthor[] } | null>(null)
const loading = ref(false)

onMounted(() => {
  if (availableYears.value.length > 0) {
    selectedYear.value = availableYears.value[0]
  }
  loadReport()
})

const getBadgeClass = (rank: number) => {
  if (rank === 1) return 'bg-warning text-dark'
  if (rank === 2) return 'bg-secondary'
  if (rank === 3) return 'bg-danger'
  return 'bg-primary'
}

const loadReport = async () => {
  loading.value = true
  try {
    const response = await apiClient.getTopAuthors(selectedYear.value)
    report.value = response.data
  } catch (error) {
    console.error('Failed to load report:', error)
  } finally {
    loading.value = false
  }
}
</script>
