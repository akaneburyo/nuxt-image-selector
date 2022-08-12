import { Plugin } from '@nuxt/types'

const getRandomString = (n: number = 16) => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  Array.from(Array(n))
    .map(() => s[Math.floor(Math.random() * s.length)])
    .join('')
}

const plugin: Plugin = (_, inject) => inject('getRandomString', getRandomString)
export default plugin
