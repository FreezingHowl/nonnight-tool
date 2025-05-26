import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
    state: () => ({
        isLoading: false,
        error: null as string | null
    }),
    actions: {
        setLoading(status: boolean) {
            this.isLoading = status
        }
    }
})
