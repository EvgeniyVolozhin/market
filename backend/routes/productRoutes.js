const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/products - получить все товары
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// GET /api/products/featured - получить рекомендуемые товары
router.get('/featured', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE is_featured = true');
        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении рекомендуемых товаров:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// GET /api/products/:id - получить один товар по ID
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        
        res.json(products[0]);
    } catch (error) {
        console.error('Ошибка при получении товара:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// POST /api/products - добавить новый товар
router.post('/', async (req, res) => {
    try {
        const { name, description, price, old_price, category, image, stock_quantity, is_featured } = req.body;
        
        // Проверяем обязательные поля
        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Название, цена и категория обязательны' });
        }
        
        const [result] = await db.query(
            `INSERT INTO products (name, description, price, old_price, category, image, stock_quantity, is_featured) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description || '', price, old_price || null, category, image || '/placeholder.jpg', stock_quantity || 0, is_featured || false]
        );
        
        const [newProduct] = await db.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
        
        res.status(201).json(newProduct[0]);
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// PUT /api/products/:id - обновить товар
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, old_price, category, image, stock_quantity, is_featured } = req.body;
        const productId = req.params.id;
        
        const [result] = await db.query(
            `UPDATE products 
             SET name = ?, description = ?, price = ?, old_price = ?, category = ?, image = ?, stock_quantity = ?, is_featured = ?
             WHERE id = ?`,
            [name, description, price, old_price, category, image, stock_quantity, is_featured, productId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        
        const [updatedProduct] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        res.json(updatedProduct[0]);
    } catch (error) {
        console.error('Ошибка при обновлении товара:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// DELETE /api/products/:id - удалить товар
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        
        res.json({ message: 'Товар успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// GET /api/products/category/:category - получить товары по категории
router.get('/category/:category', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE category = ?', [req.params.category]);
        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении товаров по категории:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;