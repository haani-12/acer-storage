import { ref } from 'vue'
import { defineStore } from 'pinia'
import { products } from '@/data/products'
import { supportItems } from '@/data/support'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)
  let timer = null

  function clear() {
    query.value = ''
    results.value = []
    loading.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function setQuery(q) {
    query.value = q
    if (timer) clearTimeout(timer)
    // debounce client-side filtering
    timer = setTimeout(() => {
      searchNow()
    }, 220)
  }

  function searchNow() {
    const q = query.value.trim().toLowerCase()
    if (!q) {
      results.value = []
      loading.value = false
      return
    }
    loading.value = true

    const prodMatches = products
      .filter((p) => (p.title + ' ' + (p.desc || '')).toLowerCase().includes(q))
      .map((p) => ({ ...p, _type: 'product' }))

    const supportMatches = supportItems
      .filter((s) => (s.title + ' ' + (s.description || '') + ' ' + (s.content || '')).toLowerCase().includes(q))
      .map((s) => ({ ...s, _type: 'support' }))

    results.value = [...prodMatches, ...supportMatches].slice(0, 12)
    loading.value = false
  }

  function selectItem(item) {
    // clear search afterwards; navigation is the caller's responsibility
    clear()
    return item
  }

  return { query, results, loading, setQuery, searchNow, clear, selectItem }
})
