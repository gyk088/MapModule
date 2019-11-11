# WEB приложение для такси

## Инструкция по использованию

Установка рабочего окружения:

    yarn install (npm install)

Запуск сервера для разработки:

    yarn start (npm run start)

Собрать приложение:

    yarn build (npm run build)

Поднять верcию приложения:

    npm version major | minor | patch

Собрать документацию:

    yarn doc (npm run doc)

## Внутреннее устройство

```
|-- frontend
    |-- dist
    |-- docs
    |-- node_modules
    |-- src
    |   |-- core
    |   |   |--helpers.js
    |   |   |--module.js
    |   |   |--observ.js
    |   |   |--root.module.js
    |   |-- images
    |   |   |--index.js
    |   |-- modules
    |   |   |--Map
    |   |-- config.js
    |   |-- index.html
    |   |-- index.js
    |-- .gitignore
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- webpack.config.js
```

- **dist** - папка для хранения скомпилированных файлов
- **docs** - папка для работы с документацией
- **src** - весь код программы
- **src/core** - базовые классы для модулей и helpers
- **src/images** - файлы с расширением png|jpeg|jpg|svg
- **src/modules** - модули приложения
- **src/modules/Map** - модуль карта
- **src/config.js** - глобальный конфиг приложения
- **src/index.html** - главный html шаблон
- **src/index.js** - точка входа

## Документация

#### Вверху тега <script> описываем:

@module | @vue-computed | @vue-data | @vue-event | @vue-prop

```
<script>
/**
  * Модуль Авторизация                  - (Название модуля, можно краткое его описание)
  * @module Module/Auth/App             - (Путь к файлу)
  * @vue-computed {String} reverseText  - Переворачивает текст
  * @vue-data {String} name             - имя
  * @vue-event {Number} pushCount       - Емитит value
  * @vue-prop {String} name             - имя
  */
```

#### Пример документации метода (функции)

    Комментарии к методу описываются над каждым методом отдельно
    1) Описание метода
    2) Описываем '@param' параметры функции
    3) Описываем '@return' если функция что-то возвращает

```
/**
  * Описание метода (сортирует массив)
  * @param {Array} arr - Массив
  * @return {Array} arr - Возвращает отсортированный массив
  */
function example (arr) {
    return arr.sort()
}
```

#### `@const` - {Тип данных} - Название константы - описание

```
/**
  *  @const {Number} SEARCH_TIME_IN - Каждые 500мс обновляется данные с инпута
  */
const SEARCH_TIME_IN = 500;
```

#### `@module` - название модуля

    1) Описываем название модуля
    2) Указываем директорию в которой находится данный файл
        Начальная директория src
        Если директория components то пишем Component,  modules - Module, и по аналогии

```
/**
  * Модуль Авторизация       - (Название модуля, можно краткое его описание)
  * @module Module/Auth/App  - (Путь к файлу)
  */
```

#### `@param` - {Тип данных} - название параметра - краткое описание

```
/**
  * @param {String} name - Имя
  * @param {Number} [size = 11] size - размер - (Дефолтное значение 11)
  *                 [в квадратных скобках указывается не обязательный параметр]
  * @param {Object} obj - Объект (описываем все свойства внутри объекта)
  * @param {String} obj.name - имя объект
  * @param {Object} obj.options - опции объекта
  * @param {String} obj.options.color - опция объекта цвет
  * @param {Number} obj.options.price - опция объекта цена
  */
function example (name, size = 11, obj) {}
```

#### `@return` - документирует значение, которое возвращает функция.

```
/**
  * @return {Array} arr - Возвращает измененный массив
  */
```

#### `@vue-computed` - {Тип данных} - название - (краткое описание)

```
/**
  * @vue-computed {String} reverseText - Переворачивает текст
  */
reverseText(message) {
    return message.split('').reverse().join('')
}
```

#### `@vue-data` - {Тип данных} - название - (краткое описание)

```
/**
  * @vue-data {String} name - имя
  * @vue-data {Object} - order - объект заказа
  * @vue-data {String} - order.name - название заказа
  */
data () {
    return {
        name: 'какое-то имя',
        order: {
            name: 'название заказа'
        }
    }
}
```

#### `@vue-event` - {Тип данных} - название - (краткое описание)

```
/**
  * @vue-event {Number} pushCount - Емитит value
  */
this.$emit('pushCount', value);
```

#### `@vue-prop` - {Тип данных} - название - (краткое описание)

```
/**
  * @vue-prop {String} name     - имя
  * @vue-prop {Number} [age=1]  - age [не обязательный параметр]
  */
props: {
    name: {type: String},
    age: {type: Number, default: 1}
}
```
