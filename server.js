const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Секрет для подписывания cookies
const COOKIE_SECRET = 'my_super_secret_key_123';

app.use(express.static(path.join(__dirname, 'public'))); // отдача html/css/js
app.use(express.json()); // парсинг JSON тела
app.use(cookieParser(COOKIE_SECRET)); // для подписанных cookies

// Получение корзины с клиента
app.post('/save-cart', (req, res) => {
  const cart = req.body;

  // Сохраняем корзину в подписанную куку
  res.cookie('user_cart', JSON.stringify(cart), {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    httpOnly: false,
    signed: true,
  });

  res.status(200).json({ message: 'Корзина сохранена!' });
});

// Отдаём корзину, если есть
app.get('/load-cart', (req, res) => {
  const cart = req.signedCookies['user_cart'];

  if (cart) {
    try {
      res.json(JSON.parse(cart));
    } catch (e) {
      res.status(400).json({ error: 'Ошибка чтения корзины' });
    }
  } else {
    res.json({});
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});