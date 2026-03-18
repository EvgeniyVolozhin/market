<template>
  <div class="admin-panel">
    <div class="container">
      <h2>Админ-панель</h2>
      
      <!-- Форма добавления товара -->
      <div class="add-product-form">
        <h3>Добавить новый товар</h3>
        
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label>Название товара *</label>
            <input v-model="newProduct.name" type="text" required>
          </div>
          
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="newProduct.description" rows="3"></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Цена *</label>
              <input v-model="newProduct.price" type="number" step="0.01" required>
            </div>
            
            <div class="form-group">
              <label>Старая цена</label>
              <input v-model="newProduct.old_price" type="number" step="0.01">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Категория *</label>
              <select v-model="newProduct.category" required>
                <option value="">Выберите категорию</option>
                <option value="pants">Pants</option>
                <option value="dresses">Dresses</option>
                <option value="blouses">Blouses</option>
                <option value="outerwear">Outerwear</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Количество на складе</label>
              <input v-model="newProduct.stock_quantity" type="number">
            </div>
          </div>
          
          <div class="form-group">
            <label>Путь к изображению</label>
            <input v-model="newProduct.image" type="text" placeholder="/product/01.jpg">
          </div>
          
          <div class="form-group checkbox">
            <label>
              <input v-model="newProduct.is_featured" type="checkbox">
              Рекомендуемый товар
            </label>
          </div>
          
          <button type="submit" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Добавить товар' }}
          </button>
        </form>
        
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </div>
      
      <!-- Список товаров -->
      <div class="products-list">
        <h3>Существующие товары</h3>
        
        <div v-if="loading" class="loading">Загрузка...</div>
        
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Рекоменд.</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>${{ product.price }}</td>
              <td>
                <span v-if="product.is_featured" class="featured-badge">★</span>
                <span v-else>-</span>
              </td>
              <td>
                <button @click="deleteProduct(product.id)" class="delete-btn">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productService } from '../services/api'

// Состояния
const products = ref([])
const loading = ref(false)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Новый товар
const newProduct = ref({
  name: '',
  description: '',
  price: '',
  old_price: '',
  category: '',
  image: '',
  stock_quantity: 0,
  is_featured: false
})

// Загружаем товары
const fetchProducts = async () => {
  loading.value = true
  try {
    products.value = await productService.getAllProducts()
  } catch (error) {
    errorMessage.value = 'Ошибка загрузки товаров'
  } finally {
    loading.value = false
  }
}

// Добавляем товар
const addProduct = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  try {
    const productData = {
      ...newProduct.value,
      price: parseFloat(newProduct.value.price),
      old_price: newProduct.value.old_price ? parseFloat(newProduct.value.old_price) : null,
      stock_quantity: parseInt(newProduct.value.stock_quantity) || 0
    }
    
    await productService.addProduct(productData)
    
    successMessage.value = 'Товар успешно добавлен!'
    
    // Очищаем форму
    newProduct.value = {
      name: '',
      description: '',
      price: '',
      old_price: '',
      category: '',
      image: '',
      stock_quantity: 0,
      is_featured: false
    }
    
    // Обновляем список товаров
    await fetchProducts()
    
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении товара'
  } finally {
    saving.value = false
  }
}

// Удаляем товар
const deleteProduct = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить товар?')) return
  
  try {
    await productService.deleteProduct(id)
    await fetchProducts()
  } catch (error) {
    errorMessage.value = 'Ошибка при удалении товара'
  }
}

// Загружаем товары при монтировании
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.admin-panel {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h2, h3 {
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 30px;
}

.add-product-form {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 50px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox input {
  width: auto;
}

button[type="submit"] {
  background: #5A6D57;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

button[type="submit"]:hover {
  background: #4a5a47;
}

button[type="submit"]:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success {
  margin-top: 20px;
  padding: 10px;
  background: #d4edda;
  color: #155724;
  border-radius: 4px;
}

.error {
  margin-top: 20px;
  padding: 10px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
}

.products-list table {
  width: 100%;
  border-collapse: collapse;
}

.products-list th,
.products-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.products-list th {
  background: #f5f5f5;
  font-weight: 600;
}

.featured-badge {
  color: gold;
  font-size: 20px;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #c82333;
}
</style>