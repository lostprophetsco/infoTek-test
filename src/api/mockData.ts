import type { Book, Author, AuthorShort } from '../types/api'

export const mockAuthors: AuthorShort[] = [
  { id: 1, full_name: 'Александр Пушкин' },
  { id: 2, full_name: 'Лев Толстой' },
  { id: 3, full_name: 'Фёдор Достоевский' },
  { id: 4, full_name: 'Антон Чехов' },
  { id: 5, full_name: 'Иван Тургенев' }
]

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'Евгений Онегин',
    year: 1833,
    description: 'Роман в стихах',
    isbn: '978-5-17-123456-7',
    cover_url: '',
    authors: [{ id: 1, full_name: 'Александр Пушкин' }]
  },
  {
    id: 2,
    title: 'Капитанская дочка',
    year: 1836,
    description: 'Исторический роман',
    isbn: '978-5-17-123456-8',
    cover_url: '',
    authors: [{ id: 1, full_name: 'Александр Пушкин' }]
  },
  {
    id: 3,
    title: 'Руслан и Людмила',
    year: 1820,
    description: 'Поэма-сказка',
    isbn: '978-5-17-123456-9',
    cover_url: '',
    authors: [{ id: 1, full_name: 'Александр Пушкин' }]
  },
  {
    id: 4,
    title: 'Война и мир',
    year: 1869,
    description: 'Роман-эпопея',
    isbn: '978-5-17-234567-8',
    cover_url: '',
    authors: [{ id: 2, full_name: 'Лев Толстой' }]
  },
  {
    id: 5,
    title: 'Анна Каренина',
    year: 1877,
    description: 'Роман',
    isbn: '978-5-17-234567-9',
    cover_url: '',
    authors: [{ id: 2, full_name: 'Лев Толстой' }]
  },
  {
    id: 6,
    title: 'Преступление и наказание',
    year: 1866,
    description: 'Психологический роман',
    isbn: '978-5-17-345678-9',
    cover_url: '',
    authors: [{ id: 3, full_name: 'Фёдор Достоевский' }]
  },
  {
    id: 7,
    title: 'Братья Карамазовы',
    year: 1880,
    description: 'Роман',
    isbn: '978-5-17-345678-0',
    cover_url: '',
    authors: [{ id: 3, full_name: 'Фёдор Достоевский' }]
  },
  {
    id: 8,
    title: 'Вишневый сад',
    year: 1904,
    description: 'Комедия',
    isbn: '978-5-17-456789-0',
    cover_url: '',
    authors: [{ id: 4, full_name: 'Антон Чехов' }]
  },
  {
    id: 9,
    title: 'Чайка',
    year: 1896,
    description: 'Пьеса',
    isbn: '978-5-17-456789-1',
    cover_url: '',
    authors: [{ id: 4, full_name: 'Антон Чехов' }]
  },
  {
    id: 10,
    title: 'Отцы и дети',
    year: 1862,
    description: 'Роман',
    isbn: '978-5-17-567890-1',
    cover_url: '',
    authors: [{ id: 5, full_name: 'Иван Тургенев' }]
  }
]

export const mockAuthorsFull: Author[] = mockAuthors.map(author => ({
  id: author.id,
  full_name: author.full_name,
  books: mockBooks.filter(book => book.authors.some(a => a.id === author.id)).map(b => ({
    id: b.id,
    title: b.title,
    year: b.year
  }))
}))
