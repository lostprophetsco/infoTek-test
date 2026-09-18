import { computed } from 'vue'
import { mockBooks } from '../api/mockData'
import type { Book } from '../types/api'

export const useBookYears = () => {
  const availableYears = computed(() => {
    const years = [...new Set(mockBooks.map((book: Book) => book.year))]
    return years.sort((a, b) => b - a)
  })

  return { availableYears }
}
