<template>
  <section class="best-sellers">
    <div class="container">
      <!-- ШАПКА СЕКЦИИ -->
      <div class="section-header">
        <h2 class="section-title">Best Sellers</h2>
        <button class="view-all">View All</button>
      </div>

      <!-- СОСТОЯНИЕ ЗАГРУЗКИ -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Загрузка товаров...</p>
      </div>

      <!-- СОСТОЯНИЕ ОШИБКИ -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchProducts" class="retry-btn">Повторить</button>
      </div>

      <!-- КОНТЕЙНЕР КАРУСЕЛИ С ТОВАРАМИ -->
      <div v-else class="carousel-container">
        <!-- СТРЕЛКА НАЗАД -->
        <button 
          class="carousel-arrow prev" 
          @click="prevSlide" 
          :disabled="currentPage === 0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- ТРЕК С ТОВАРАМИ -->
        <div 
          class="carousel-track" 
          :style="{ transform: `translateX(-${currentPage * 100}%)` }"
        >
          <!-- Группа товаров для каждой страницы -->
          <div 
            v-for="(page, index) in paginatedProducts" 
            :key="index"
            class="carousel-page"
          >
            <ProductCard
              v-for="product in page"
              :key="product.id"
              :id="product.id"  
              :image="getImageUrl(product.image)"
              :title="product.name"
              :category="product.description"
              :price="product.price"
              :is-favorite="product.isFavorite || false"
              @toggle-favorite="toggleFavorite(product.id)"
            />
          </div>
        </div>

        <!-- СТРЕЛКА ВПЕРЕД -->
        <button 
          class="carousel-arrow next" 
          @click="nextSlide" 
          :disabled="currentPage >= totalPages - 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- ИНДИКАТОРЫ (ТОЧКИ) -->
      <div class="carousel-dots" v-if="!loading && !error">
        <span 
          v-for="index in totalPages" 
          :key="index"
          :class="['dot', { active: currentPage === index - 1 }]"
          @click="goToPage(index - 1)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { productService } from '../services/api'

// Состояния
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Количество товаров на странице
const ITEMS_PER_PAGE = 3

// Текущая страница
const currentPage = ref(0)

// Загружаем товары из базы данных
const fetchProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Получаем все товары из API
    const data = await productService.getAllProducts()
    console.log('Загруженные товары:', data)
    
    // Добавляем поле isFavorite для каждого товара
    products.value = data.map(product => ({
      ...product,
      isFavorite: false
    }))
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err)
    error.value = 'Не удалось загрузить товары. Проверьте подключение к серверу.'
  } finally {
    loading.value = false
  }
}

// Загружаем товары при создании компонента
onMounted(() => {
  fetchProducts()
})

// Формируем правильный URL для изображения
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg'
  if (imagePath.startsWith('http')) return imagePath
  // Если путь начинается с /product, добавляем ./../../public
  if (imagePath.startsWith('/product')) {
    return `.${imagePath}`
  }
  return imagePath
}

// Вычисляем общее количество страниц
const totalPages = computed(() => 
  Math.ceil(products.value.length / ITEMS_PER_PAGE)
)

// Разбиваем товары на страницы по 3
const paginatedProducts = computed(() => {
  const pages = []
  for (let i = 0; i < products.value.length; i += ITEMS_PER_PAGE) {
    pages.push(products.value.slice(i, i + ITEMS_PER_PAGE))
  }
  return pages
})

// Метод для перехода к следующей странице
const nextSlide = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

// Метод для перехода к предыдущей странице
const prevSlide = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

// Метод для перехода к конкретной странице
const goToPage = (pageIndex) => {
  if (pageIndex >= 0 && pageIndex < totalPages.value) {
    currentPage.value = pageIndex
  }
}

// Метод для переключения избранного
const toggleFavorite = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.isFavorite = !product.isFavorite
    // Здесь можно добавить отправку на сервер для сохранения избранного
  }
}
</script>

<style lang="scss" scoped>
$primary-green: #5A6D57;
$text-dark: #1A1A1A;
$text-light: #666666;
$white: #FFFFFF;
$border-light: #E5E5E5;

.best-sellers {
  padding: 80px 0;
  background: $white;
  width: 100%;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    font-weight: 400;
    color: $text-dark;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }
  
  .view-all {
    background: none;
    border: 1px solid $text-dark;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: $text-dark;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 32px;
    transition: all 0.3s ease;
    
    &:hover {
      background: $primary-green;
      border-color: $primary-green;
      color: $white;
    }
  }
}

/* Стили для загрузки и ошибок */
.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  
  p {
    font-size: 18px;
    color: $text-light;
    margin-top: 20px;
  }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid $border-light;
  border-top-color: $primary-green;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  background: $primary-green;
  color: $white;
  border: none;
  padding: 10px 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
  
  &:hover {
    background: darken($primary-green, 10%);
  }
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.carousel-page {
  display: flex;
  gap: 24px;
  flex: 0 0 100%;
  min-width: 0;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: $white;
  border: 1px solid $border-light;
  color: $text-dark;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: $primary-green;
    border-color: $primary-green;
    color: $white;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    left: -24px;
  }
  
  &.next {
    right: -24px;
  }
}

.carousel-dots {
  display: none;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $border-light;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      background: $primary-green;
      width: 24px;
      border-radius: 4px;
    }
    
    &:hover {
      background: $primary-green;
    }
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .container {
    padding: 0 20px;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
    
    &.prev {
      left: -20px;
    }
    
    &.next {
      right: -20px;
    }
  }
}

@media (max-width: 768px) {
  .best-sellers {
    padding: 60px 0;
  }
  
  .section-header {
    .section-title {
      font-size: 28px;
    }
  }
  
  .carousel-arrow {
    display: none;
  }
  
  .carousel-dots {
    display: flex;
  }
  
  .carousel-page {
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .section-header {
    .section-title {
      font-size: 24px;
    }
    
    .view-all {
      padding: 10px 24px;
      font-size: 12px;
    }
  }
  
  .loading, .error {
    min-height: 300px;
    
    p {
      font-size: 16px;
    }
  }
}
</style>