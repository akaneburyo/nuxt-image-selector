import type { Utils } from '@/plugins/utils'
import type { Constants } from '@/plugins/constants'
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils
    $constants: Constants
  }
}

declare module '@nuxt/types' {
  interface Context {
    $utils: Utils
    $constants: Constants
  }
}
