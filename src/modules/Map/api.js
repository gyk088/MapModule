import axios from "axios"
import Cookies from "js-cookie"

/**
 * Запросы модуля "Карта" на бэкенд
 * @module Module/Map/Api
 */
export default {
  /**
   * Метод получает  настройки  админа
   * @return {Object} - возвращает response.data или null, в случае ошибки
   */
  getSettings: async () => {
    try {
      let response = await axios.get("admin/", {
        params: {
          settings: true,
          "admin.token": Cookies.get("token")
        }
      })
      return response.data.user
    } catch (err) {
      console.error(err)
      return null
    }
  },
  /**
   * Метод получает все активные заказы на доставку. Cтатусы: active, driver_accepted
   * @return {Object} - возвращает response.data или null, в случае ошибки
   */
  getActiveOrders: async () => {
    try {
      let response = await axios.get("admin/delivery/", {
        params: {
          active_delivery: true,
          "admin.token": Cookies.get("token")
        }
      })
      return response.data.delivery
    } catch (err) {
      console.log(err)
      return null
    }
  },
  /**
   * Метод получает всех активных курьеров
   * @return {Object} - возвращает response.data или null, в случае ошибки
   */
  getActiveDrivers: async () => {
    try {
      let response = await axios.get("admin/driver/", {
        params: {
          active_delivery: true,
          "admin.token": Cookies.get("token"),
          "start.latitude": 0,
          "start.longitude": 0,
          "finish.latitude": 90,
          "finish.longitude": 180
        }
      })
      return response.data.drivers
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
