import type { Utils } from '@/plugins/utils'
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils
  }
}

declare module '@nuxt/types' {
  interface Context {
    $utils: Utils
  }
}
