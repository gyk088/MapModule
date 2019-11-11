/**
 * Копирование объекта
 * @param  {Object}  obj - object
 * @param  {boolean} req - deep copy
 * @return {Object}      - сopy object
 */
export function clone(obj, req) {
  var newObj = isArray(obj) ? [] : {}
  for (var i in obj) {
    if (req && typeof obj[i] === "object" && i !== "prototype") {
      newObj[i] = clone(obj[i])
    } else {
      newObj[i] = obj[i]
    }
  }
  return newObj
}

/**
  * Проверка obj на функцию
  * @param somebody
  */
export function isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]"
}

/**
  * Проверка obj на Массив
  * @param somebody
  */
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}

/**
  * Проверка obj на Объект
  * @param somebody
  */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

/**
  * Проверка obj на пустоту в переменной
  * @param somebody
  */
export function isEmpty(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return false
  }
  for (var i in obj) {
    if (o.hasOwnProperty(i)) {
      return false
    }
  }
  return true
}

/**
 *  Функция преобразовывает число в строку в формате 06
 *  @param {Number} num - Число которое требуется преобразовать
 *  @return {String} - Строка в формате 06
 */
export function zeroPadded(num) {
  return num < 10 ? `0${num}` : `${num}`
}