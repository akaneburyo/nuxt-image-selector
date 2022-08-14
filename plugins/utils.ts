import { Plugin } from '@nuxt/types'

export type Utils = {
  getRandomString: (length?: number) => string
}

const utils: Utils = {
  getRandomString: (length) => {
    const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array.from(Array(length || 16))
      .map(() => s[Math.floor(Math.random() * s.length)])
      .join('')
  },
}

const plugin: Plugin = (_, inject) => inject('utils', utils)
export default plugin
