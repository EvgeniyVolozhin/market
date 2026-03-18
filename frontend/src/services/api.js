import axios from 'axios';

// Функция для определения базового URL
const getBaseURL = () => {
    // Для продакшена (Vercel)
    if (import.meta.env.PROD) {
        // Используем переменную окружения или значение по умолчанию
        return import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api';
    }
    
    // Для разработки (локально)
    return 'http://localhost:5000/api';
};

const API_URL = getBaseURL();

console.log('🔧 API URL:', API_URL);
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('🔧 PROD:', import.meta.env.PROD);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 секунд таймаут
});

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            console.error('❌ Таймаут запроса');
        } else if (error.response) {
            console.error(`❌ Ошибка ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            console.error('❌ Сервер не отвечает. Проверьте подключение к бэкенду');
            console.error('❌ URL:', API_URL);
        } else {
            console.error('❌ Ошибка:', error.message);
        }
        return Promise.reject(error);
    }
);

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