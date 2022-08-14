import { Plugin } from '@nuxt/types'

export type Constants = {
  api: {
    baseUrl: 'https://httpbin.org'
    path: {
      postNewImage: string
      postOrders: string
      deleteImage: string
    }
  }
}

const constants: Constants = {
  api: {
    baseUrl: 'https://httpbin.org',
    path: {
      postNewImage: 'https://httpbin.org/post',
      postOrders: 'https://httpbin.org/post',
      deleteImage: 'https://httpbin.org/delete?id=:id',
    },
  },
}

const plugin: Plugin = (_, inject) => inject('constants', constants)
export default plugin
