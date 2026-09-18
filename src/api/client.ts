import type {
  LoginRequest,
  LoginResponse,
  BookListResponse,
  BookResponse,
  BookInput,
  AuthorListResponse,
  AuthorResponse,
  AuthorInput,
  TopAuthorsResponse,
  ErrorResponse
} from '../types/api'
import { mockBooks, mockAuthors, mockAuthorsFull } from './mockData'

const API_BASE_URL = '/api/v1'
const USE_MOCK = true // Switch to false when real backend is ready

class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (USE_MOCK) {
      return this.mockRequest<T>(endpoint, options)
    }

    const url = `${API_BASE_URL}${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw new Error(error.errors?.[0]?.message || 'Request failed')
    }

    return response.json()
  }

  private async mockRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate network delay

    const method = options.method || 'GET'

    // Auth
    if (endpoint === '/auth/login' && method === 'POST') {
      const body = JSON.parse(options.body as string) as LoginRequest
      if (body.username === 'admin' && body.password === 'admin') {
        return {
          success: true,
          data: {
            token: 'mock-jwt-token',
            expires_at: new Date(Date.now() + 3600000).toISOString(),
            user: { id: 1, username: 'admin', role: 'user' }
          }
        } as T
      }
      throw new Error('Invalid credentials')
    }

    // Books
    if (endpoint === '/books' && method === 'GET') {
      const page = 1
      const perPage = 20

      return {
        success: true,
        data: {
          items: mockBooks,
          pagination: {
            total: mockBooks.length,
            page,
            per_page: perPage,
            total_pages: Math.ceil(mockBooks.length / perPage)
          }
        }
      } as T
    }

    if (endpoint.match(/^\/books\/\d+$/) && method === 'GET') {
      const id = parseInt(endpoint.split('/')[2])
      const book = mockBooks.find(b => b.id === id)
      if (!book) throw new Error('Book not found')
      return { success: true, data: book } as T
    }

    // Authors
    if (endpoint === '/authors' && method === 'GET') {
      return {
        success: true,
        data: {
          items: mockAuthors,
          pagination: {
            total: mockAuthors.length,
            page: 1,
            per_page: 20,
            total_pages: 1
          }
        }
      } as T
    }

    if (endpoint.match(/^\/authors\/\d+$/) && method === 'GET') {
      const id = parseInt(endpoint.split('/')[2])
      const author = mockAuthorsFull.find(a => a.id === id)
      if (!author) throw new Error('Author not found')
      return { success: true, data: author } as T
    }

    // Reports
    if (endpoint === '/reports/top-authors' && method === 'GET') {
      const year = 2024

      return {
        success: true,
        data: {
          year,
          items: mockAuthorsFull.map((author, index) => ({
            rank: index + 1,
            author_id: author.id,
            full_name: author.full_name,
            books_count: author.books.length
          }))
        }
      } as T
    }

    throw new Error('Endpoint not implemented in mock')
  }

  // Auth
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Books
  async getBooks(params?: { page?: number; 'per-page'?: number; author_id?: number; year?: number; search?: string }): Promise<BookListResponse> {
    const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : ''
    return this.request<BookListResponse>(`/books${queryString ? `?${queryString}` : ''}`)
  }

  async getBook(id: number): Promise<BookResponse> {
    return this.request<BookResponse>(`/books/${id}`)
  }

  async createBook(formData: FormData): Promise<BookResponse> {
    return this.request<BookResponse>('/books', {
      method: 'POST',
      body: formData as unknown as BodyInit
    })
  }

  async updateBook(id: number, formData: FormData): Promise<BookResponse> {
    return this.request<BookResponse>(`/books/${id}`, {
      method: 'PUT',
      body: formData as unknown as BodyInit
    })
  }

  async patchBook(id: number, data: BookInput): Promise<BookResponse> {
    return this.request<BookResponse>(`/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async deleteBook(id: number): Promise<void> {
    return this.request<void>(`/books/${id}`, { method: 'DELETE' })
  }

  // Authors
  async getAuthors(params?: { page?: number; 'per-page'?: number; search?: string }): Promise<AuthorListResponse> {
    const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : ''
    return this.request<AuthorListResponse>(`/authors${queryString ? `?${queryString}` : ''}`)
  }

  async getAuthor(id: number): Promise<AuthorResponse> {
    return this.request<AuthorResponse>(`/authors/${id}`)
  }

  async createAuthor(data: AuthorInput): Promise<AuthorResponse> {
    return this.request<AuthorResponse>('/authors', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateAuthor(id: number, data: AuthorInput): Promise<AuthorResponse> {
    return this.request<AuthorResponse>(`/authors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteAuthor(id: number): Promise<void> {
    return this.request<void>(`/authors/${id}`, { method: 'DELETE' })
  }

  // Reports
  async getTopAuthors(year: number): Promise<TopAuthorsResponse> {
    return this.request<TopAuthorsResponse>(`/reports/top-authors?year=${year}`)
  }
}

export const apiClient = new ApiClient()
