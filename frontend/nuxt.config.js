const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'えもじっく😋',
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
      { property: 'og:image', content: '/images/multi_faces.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'apple-touch-icon',
        size: '180x180',
        href: '/apple-touch-icon-152x152.png'
      }
    ],
    link: [
      {
        rel: 'icon',
        size: '152x152',
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

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vuesax'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['nuxt-sass-resources-loader', ['@/assets/styles/global.scss']],
    '@nuxtjs/pwa'
  ],
  manifest: {
    name: 'えもじっく😋',
    short_name: 'えもじっく',
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
