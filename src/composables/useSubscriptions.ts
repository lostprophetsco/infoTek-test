import { ref, computed } from 'vue'

const STORAGE_KEY = 'author_subscriptions'

const getSubscriptions = (): Set<number> => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? new Set(JSON.parse(stored)) : new Set()
}

const saveSubscriptions = (subscriptions: Set<number>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscriptions]))
}

export const useSubscriptions = () => {
  const subscriptions = ref<Set<number>>(getSubscriptions())

  const isSubscribed = (authorId: number) => {
    return subscriptions.value.has(authorId)
  }

  const toggleSubscription = (authorId: number) => {
    if (subscriptions.value.has(authorId)) {
      subscriptions.value.delete(authorId)
    } else {
      subscriptions.value.add(authorId)
    }
    saveSubscriptions(subscriptions.value)
  }

  const subscribedAuthors = computed(() => [...subscriptions.value])

  return {
    isSubscribed,
    toggleSubscription,
    subscribedAuthors
  }
}
