<template>
  <div id="MainContent">
  </div>
</template>

<script>
import api from "Map/api"
import "Images"

/**
 * Модуль карта с водитлеями и с заказами
 * @module Module/Map/App
 *
 * @vue-data {Object} adminSettings - настройки администратора
 * @vue-data {Object} map - объект карты google.maps
 * @vue-data {Object} bounds - объект для центрирования google.maps
 * @vue-data {Array} driversMarkers - массив с объектами маркеров водителей
 * @vue-data {Array} orderMarkers - массив с объектами маркеров закзаов
 * @vue-data {number} driverTimerId - id таймера для получения данных о водителях
 * @vue-data {number} orderTimerId - id таймера для получения данных о заказах
 */
export default {
  el: "#root",
  name: "FullMap",
  data() {
    return {
      orderMarkers: [],
      driversMarkers: [],
      adminSettings: undefined,
      map: undefined,
      bounds: undefined,
      driverTimerId: undefined,
      orderTimerId: undefined,
    };
  },
  methods: {
    /**
    * Инициализация краты
    * @param {Object} center - объект типа google.maps.LatLng, центр карты
    */
    initMap (center) {
      this.map = new google.maps.Map(document.getElementById('MainContent'), {
        zoom: 14,
        center: center,
      })
      this.bounds = new google.maps.LatLngBounds();
      this.bounds.extend(center)
    },
    /**
    *  Метод получает водителей из бэкенда, и помещает их на крату
    */
    async driversToMap() {
      // получаем водителей из бэкенада
      const activeDrivers = await api.getActiveDrivers()
      // удаляем всех водителей на карте
      this.driversMarkers.forEach(marker => {
        marker.setMap(null);
      })
      // чистим массив с маркерами водителей
      this.driversMarkers = [];

      activeDrivers.forEach(driver => {
        // создаем маркер
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(driver.latitude, driver.longitude),
          title: driver.name,
          icon: {
            url: driver.busy ? 'images/car_icon_busy.png' : 'images/car_icon.png',
            scaledSize: {
              height: 24,
              width: 16,
            },
          },
          map: this.map,
        });

        // помещаем маркер в массив маркеров
        marker.addListener('click', () => this.showDriverInfo(driver, marker));
       // помещаем маркер в массив маркеров
        this.driversMarkers.push(marker)
        // помещаем координаты маркера для центрироавния карты
        this.bounds.extend(marker.position)
      })
      // центрируем карту
      this.map.fitBounds(this.bounds)
    },
    /**
    *  Метод получает заказы из бэкенда, и помещает их на крату
    */
    async ordersToMap() {
      // получаем заказы из бэкенада
      const activeOrders = await api.getActiveOrders()
      // удаляем все заказы на карте
      this.orderMarkers.forEach(marker => {
        marker.setMap(null);
      })
      // чистим массив с маркерами заказов
      this.orderMarkers = [];

      activeOrders.forEach(order => {
        // создаем маркер
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(order.latitude_dest, order.longitude_dest),
          title: order.address_dest ,
          icon: {
            url: order.status === "active" ? "images/order_icon_blue.png" : "images/order_icon_green.png",
            scaledSize: {
              height: 24,
              width: 24,
            },
          },
          map: this.map
        });

        // помещаем маркер в массив маркеров
        this.orderMarkers.push(marker)
        // помещаем координаты маркера для центрироавния карты
        this.bounds.extend(marker.position)
        // вешам событие на маркер
        marker.addListener('click', () => this.showOrderInfo(order, marker));
      })
      // центрируем карту
      this.map.fitBounds(this.bounds)
    },
    /**
    *  Показать данные водителя
    */
    showDriverInfo(driver, marker) {
      // если есть открытые окна - закрываем их
      if (this.infowindow) this.infowindow.close()

      // создаем окно с данными о водителе
      this.infowindow = new google.maps.InfoWindow({
        content: `<p>Курьер: ${driver.name}</p>
          <p>Cтатус: ${driver.busy ? 'на заказе' : 'свободен'}</p>
          <p>Телефон: ${driver.phone}</p>`
      });

      // открываем окно
      this.infowindow.open(this.map, marker)
    },
    /**
    *  Показать данные заказа
    */
    showOrderInfo(order, marker) {
      // если есть открытые окна - закрываем их
      if (this.infowindow) this.infowindow.close()

      // создаем окно с данными о заказе
      this.infowindow = new google.maps.InfoWindow({
        content: `<a href="${OLD_WEBPANEL}#/orders/delivery/${order.id}" target="_blank">Заказ № ${order.id}</a>
          <p>Адрес: ${order.address_dest}</p>
          <p>Стоимость: ${order.desired_price} ${order.currency_symbol} </p>
          <p>Статус : ${order.status === "active" ? 'Поиск курьера' : 'Курьер назначен' }</p>
          <p style="white-space: pre-line">${order.message}</p>`
      });

      // открываем окно
      this.infowindow.open(this.map, marker)
    },
  },
  async mounted() {
    // получаем данные адимна
    this.adminSettings = await api.getSettings()
    // если не удалось получить данные админа, или это админ не доставщик - ничего не делаем
    if (!this.adminSettings || !this.adminSettings.delivery) return

    // инициализируем карту
    this.initMap(
      new google.maps.LatLng(this.adminSettings.delivery.origin.latitude, this.adminSettings.delivery.origin.longitude),
    )

    // помещаем водителей на карту
    this.driversToMap()
    // создаем интервал для обновления данных о водителях (раз в минуту)
    this.driverTimerId = setInterval(this.driversToMap, 60000);

    // помещаем заказы на карту
    this.ordersToMap()
    // создаем интервал для обновления данных о заказах (раз в минуту)
    this.orderTimerId = setInterval(this.ordersToMap, 60000);
  }
};
</script>

<style lang="scss" scoped>
#MainContent {
  width: 100%;
  height: 100%;
}
</style>
