import '@/assets/main.css'

import { createI18n } from 'vue-i18n'
import App from '@/App.ce.vue'

import en from '@/locales/en.json'
import es from '@/locales/es.json'
import { vueDefineCustomElement } from '@/shared/vueDefineCustomElement'

import { LANG_KEY_LOCALSTORAGE } from '@/constants'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

const i18n = createI18n<false>({
  legacy: false,
  locale: window.localStorage.getItem(LANG_KEY_LOCALSTORAGE) || 'en',
  fallbackLocale: 'en',
  messages: {
    es,
    en,
  },
})

const plugins = [i18n, router]

const app = vueDefineCustomElement(App, {
  plugins,
})

customElements.define('best-price', app)
