import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Template skeleton store.
 * Replace/extend AppState with your domain entities.
 *
 * Pattern mirrors rules-engine-frontend's Jotai atoms but uses Zustand:
 *   selectedItemId  ← persisted to localStorage (like atomWithStorage)
 *   items / loading ← transient server state synced from React Query
 */

interface AppState {
  selectedItemId: string
  items: unknown[]
  loading: boolean

  setSelectedItemId: (id: string) => void
  setItems: (items: unknown[]) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedItemId: '',
      items: [],
      loading: true,

      setSelectedItemId: (id) => set({ selectedItemId: id }),
      setItems: (items) => set({ items }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ selectedItemId: state.selectedItemId }),
    },
  ),
)
