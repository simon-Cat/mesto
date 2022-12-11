// Плагин для добавления вендорных префиксов
const autoprefixer = require('autoprefixer');

//Плагин для минификации css-кода
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    // Подключаем autoprefixer
    autoprefixer,
    // Подключаем cssnano
    cssnano({ preset: 'default' }),
  ],
};
