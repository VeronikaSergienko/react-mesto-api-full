const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVjYTg4NjQ0MWQ3NGI3ODdlZjE3NjQiLCJpYXQiOjE2NjcwMTY4NTksImV4cCI6MTY2NzYyMTY1OX0.QMiHeX5a0OjhVKX_SWe4h9skw2-0xFk74wJM-Tx94Zg'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'dev-secret'; // вставьте сюда секретный ключ для разработки из кода

try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(payload);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
