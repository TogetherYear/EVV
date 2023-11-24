import { defineStore } from 'pinia'

const GlobalStore = defineStore('Together', {
    state: () => {
        return {
            test: 'Hello World !'
        }
    },
    getters: {},
    actions: {}
})

export { GlobalStore }