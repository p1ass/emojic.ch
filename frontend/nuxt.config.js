const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'えもじっく😋 | 顔認識で人の顔にスタンプを貼り付けてくれるWebアプリ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'えもじっくは写真から顔を認識し絵文字😄に変換するサービスです！絵文字はランダムに選ばれるので毎回違った画像が楽しめます！'
      },
      { property: 'og:title', content: 'えもじっく😋' },
      {
        property: 'og:description',
        content:
          'えもじっくは写真から顔を認識し絵文字😄に変換するサービスです！絵文字はランダムに選ばれるので毎回違った画像が楽しめます！'
      },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: 'https://emojic.ch/images/main.jpg'
      },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-touch-icon-152x152.png'
      },
      {
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png',
        href: '/android-chrome-192x192.png'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  env: envSet,

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuesax'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['nuxt-sass-resources-loader', ['@/assets/styles/global.scss']],
    '@nuxtjs/pwa',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-127036212-3'
      }
    ],
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-4978327687969784'
      }
    ]
  ],
  manifest: {
    name: 'えもじっく😋',
    short_name: 'えもじっく',
    title: 'えもじっく😋',
    lang: 'ja'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
