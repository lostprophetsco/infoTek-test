// Auth types
export interface User {
  id: number
  username: string
  role: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    token: string
    expires_at: string
    user: User
  }
}

// Book types
export interface AuthorShort {
  id: number
  full_name: string
}

export interface Book {
  id: number
  title: string
  year: number
  description: string
  isbn: string
  cover_url: string
  authors: AuthorShort[]
}

export interface BookShort {
  id: number
  title: string
  year: number
}

export interface BookInput {
  title?: string
  year?: number
  description?: string
  isbn?: string
  author_ids?: number[]
}

export interface BookForm {
  title: string
  year: number
  description?: string
  isbn?: string
  author_ids: number[]
  cover: File
}

export interface BookResponse {
  success: boolean
  data: Book
}

// Author types
export interface Author {
  id: number
  full_name: string
  books: BookShort[]
}

export interface AuthorInput {
  full_name: string
}

export interface AuthorResponse {
  success: boolean
  data: Author
}

// List responses
export interface Pagination {
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface BookListResponse {
  success: boolean
  data: {
    items: Book[]
    pagination: Pagination
  }
}

export interface AuthorListResponse {
  success: boolean
  data: {
    items: AuthorShort[]
    pagination: Pagination
  }
}

// Report types
export interface TopAuthor {
  rank: number
  author_id: number
  full_name: string
  books_count: number
}

export interface TopAuthorsResponse {
  success: boolean
  data: {
    year: number
    items: TopAuthor[]
  }
}

// Error types
export interface ErrorItem {
  field: string
  message: string
}

export interface ErrorResponse {
  success: boolean
  errors: ErrorItem[]
}
