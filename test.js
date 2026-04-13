const db = require('./utils/inMemoryDB');
console.log('Products:', db.getProducts().length);
console.log('First product:', db.getProducts()[0]);
