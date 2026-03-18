import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const productService = {
    // Получить все товары
    getAllProducts: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении товаров:', error);
            throw error;
        }
    },
    
    // Получить рекомендуемые товары
    getFeaturedProducts: async () => {
        try {
            const response = await api.get('/products/featured');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении рекомендуемых товаров:', error);
            throw error;
        }
    },
    
    // Получить товар по ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении товара:', error);
            throw error;
        }
    },
    
    // Добавить новый товар
    addProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
            throw error;
        }
    },
    
    // Обновить товар
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error);
            throw error;
        }
    },
    
    // Удалить товар
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
            throw error;
        }
    },
    
    // Получить товары по категории
    getProductsByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении товаров по категории:', error);
            throw error;
        }
    }
};

export default api;