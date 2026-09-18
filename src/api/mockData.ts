import type { Book, Author, AuthorShort } from '../types/api'

export const mockAuthors: AuthorShort[] = [
  { id: 1, full_name: 'Александр Пушкин' },
  { id: 2, full_name: 'Лев Толстой' },
  { id: 3, full_name: 'Фёдор Достоевский' },
  { id: 4, full_name: 'Антон Чехов' },
  { id: 5, full_name: 'Иван Тургенев' },
  { id: 6, full_name: 'Александр Блок' },
  { id: 7, full_name: 'Сергей Есенин' },
  { id: 8, full_name: 'Владимир Маяковский' },
  { id: 9, full_name: 'Марина Цветаева' },
  { id: 10, full_name: 'Борис Пастернак' },
  { id: 11, full_name: 'Михаил Булгаков' },
  { id: 12, full_name: 'Алексей Толстой' },
  { id: 13, full_name: 'Иван Бунин' },
  { id: 14, full_name: 'Константин Паустовский' },
  { id: 15, full_name: 'Михаил Шолохов' }
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
  },
  {
    id: 11,
    title: 'Идиот',
    year: 1869,
    description: 'Роман',
    isbn: '978-5-17-345678-1',
    cover_url: '',
    authors: [{ id: 3, full_name: 'Фёдор Достоевский' }]
  },
  {
    id: 12,
    title: 'Дядюшкин сон',
    year: 1859,
    description: 'Повесть',
    isbn: '978-5-17-567890-2',
    cover_url: '',
    authors: [{ id: 5, full_name: 'Иван Тургенев' }]
  },
  {
    id: 13,
    title: 'Палата №6',
    year: 1892,
    description: 'Рассказ',
    isbn: '978-5-17-456789-2',
    cover_url: '',
    authors: [{ id: 4, full_name: 'Антон Чехов' }]
  },
  {
    id: 14,
    title: 'Медный всадник',
    year: 1833,
    description: 'Поэма',
    isbn: '978-5-17-123456-0',
    cover_url: '',
    authors: [{ id: 1, full_name: 'Александр Пушкин' }]
  },
  {
    id: 15,
    title: 'Двенадцать',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600001-1',
    cover_url: '',
    authors: [{ id: 6, full_name: 'Александр Блок' }]
  },
  {
    id: 16,
    title: 'Снежная маска',
    year: 100500,
    description: 'Цикл стихов',
    isbn: '978-5-17-600001-2',
    cover_url: '',
    authors: [{ id: 6, full_name: 'Александр Блок' }]
  },
  {
    id: 17,
    title: 'Ямбы',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600001-3',
    cover_url: '',
    authors: [{ id: 6, full_name: 'Александр Блок' }]
  },
  {
    id: 18,
    title: 'Роза и Крест',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600001-4',
    cover_url: '',
    authors: [{ id: 6, full_name: 'Александр Блок' }]
  },
  {
    id: 19,
    title: 'Возмездие',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600001-5',
    cover_url: '',
    authors: [{ id: 6, full_name: 'Александр Блок' }]
  },
  {
    id: 20,
    title: 'Чёрный человек',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600002-1',
    cover_url: '',
    authors: [{ id: 7, full_name: 'Сергей Есенин' }]
  },
  {
    id: 21,
    title: 'Пугачёв',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600002-2',
    cover_url: '',
    authors: [{ id: 7, full_name: 'Сергей Есенин' }]
  },
  {
    id: 22,
    title: 'Москва кабацкая',
    year: 100500,
    description: 'Цикл стихов',
    isbn: '978-5-17-600002-3',
    cover_url: '',
    authors: [{ id: 7, full_name: 'Сергей Есенин' }]
  },
  {
    id: 23,
    title: 'Русь советская',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600002-4',
    cover_url: '',
    authors: [{ id: 7, full_name: 'Сергей Есенин' }]
  },
  {
    id: 24,
    title: 'Облако в штанах',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600003-1',
    cover_url: '',
    authors: [{ id: 8, full_name: 'Владимир Маяковский' }]
  },
  {
    id: 25,
    title: 'Флейта-позвоночник',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600003-2',
    cover_url: '',
    authors: [{ id: 8, full_name: 'Владимир Маяковский' }]
  },
  {
    id: 26,
    title: 'Про это',
    year: 100500,
    description: 'Поэма',
    isbn: '978-5-17-600003-3',
    cover_url: '',
    authors: [{ id: 8, full_name: 'Владимир Маяковский' }]
  },
  {
    id: 27,
    title: 'Лебединый стан',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600004-1',
    cover_url: '',
    authors: [{ id: 9, full_name: 'Марина Цветаева' }]
  },
  {
    id: 28,
    title: 'Версты',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600004-2',
    cover_url: '',
    authors: [{ id: 9, full_name: 'Марина Цветаева' }]
  },
  {
    id: 29,
    title: 'Сестра моя — жизнь',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600005-1',
    cover_url: '',
    authors: [{ id: 10, full_name: 'Борис Пастернак' }]
  },
  {
    id: 30,
    title: 'Темы и вариации',
    year: 100500,
    description: 'Стихи',
    isbn: '978-5-17-600005-2',
    cover_url: '',
    authors: [{ id: 10, full_name: 'Борис Пастернак' }]
  },
  {
    id: 31,
    title: 'Мастер и Маргарита',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600006-1',
    cover_url: '',
    authors: [{ id: 11, full_name: 'Михаил Булгаков' }]
  },
  {
    id: 32,
    title: 'Белая гвардия',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600006-2',
    cover_url: '',
    authors: [{ id: 11, full_name: 'Михаил Булгаков' }]
  },
  {
    id: 33,
    title: 'Пётр Первый',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600007-1',
    cover_url: '',
    authors: [{ id: 12, full_name: 'Алексей Толстой' }]
  },
  {
    id: 34,
    title: 'Хождение по мукам',
    year: 100500,
    description: 'Трилогия',
    isbn: '978-5-17-600007-2',
    cover_url: '',
    authors: [{ id: 12, full_name: 'Алексей Толстой' }]
  },
  {
    id: 35,
    title: 'Тёмные аллеи',
    year: 100500,
    description: 'Рассказы',
    isbn: '978-5-17-600008-1',
    cover_url: '',
    authors: [{ id: 13, full_name: 'Иван Бунин' }]
  },
  {
    id: 36,
    title: 'Жизнь Арсеньева',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600008-2',
    cover_url: '',
    authors: [{ id: 13, full_name: 'Иван Бунин' }]
  },
  {
    id: 37,
    title: 'Повесть о лесах',
    year: 100500,
    description: 'Очерк',
    isbn: '978-5-17-600009-1',
    cover_url: '',
    authors: [{ id: 14, full_name: 'Константин Паустовский' }]
  },
  {
    id: 38,
    title: 'Золотая роза',
    year: 100500,
    description: 'Очерки',
    isbn: '978-5-17-600009-2',
    cover_url: '',
    authors: [{ id: 14, full_name: 'Константин Паустовский' }]
  },
  {
    id: 39,
    title: 'Тихий Дон',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600010-1',
    cover_url: '',
    authors: [{ id: 15, full_name: 'Михаил Шолохов' }]
  },
  {
    id: 40,
    title: 'Поднятая целина',
    year: 100500,
    description: 'Роман',
    isbn: '978-5-17-600010-2',
    cover_url: '',
    authors: [{ id: 15, full_name: 'Михаил Шолохов' }]
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
