// import type Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $getRandomString(n: number): string
  }
}
