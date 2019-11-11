import Module from "OneDeckCore/module"
import App from "Map/App.vue"
import Vue from "vue"
import api from "Map/api"

/**
 * Модуль карта
 * @module Module/Map
 */
export default class Auth extends Module {
  /**
   * Cоздаем объект модуля
   */
  constructor() {
    super()
    // Регистрируем API для доступа из компонентов
    Vue.prototype.$api = api
    this.App = new Vue(App)
  }

  /**
   * Уничтожаем объект моудля и чистим интервалы
   */
  destroy() {
    clearInterval(this.App.driverTimerId)
    clearInterval(this.App.orderTimerId)
    this.VueApp.$destroy()
    document.getElementById("MainContent").innerHTML = ""
  }
}
