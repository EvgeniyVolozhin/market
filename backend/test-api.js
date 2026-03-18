const axios = require('axios'); // сначала установите: npm install axios

async function testAPI() {
    try {
        console.log('🔄 Тестируем API...\n');
        
        // Получить все товары
        const products = await axios.get('http://localhost:5000/api/products');
        console.log('✅ GET /api/products');
        console.log('📦 Найдено товаров:', products.data.length);
        console.log('Первый товар:', products.data[0]);
        
        // Получить один товар
        const product = await axios.get('http://localhost:5000/api/products/1');
        console.log('\n✅ GET /api/products/1');
        console.log('Товар:', product.data);
        
        // Получить товары по категории
        const dresses = await axios.get('http://localhost:5000/api/products/category/dresses');
        console.log('\n✅ GET /api/products/category/dresses');
        console.log('Платьев найдено:', dresses.data.length);
        
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }
}

testAPI();