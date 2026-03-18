<!-- frontend/src/views/ProductView.vue -->
<template>
  <div class="product-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link> >
        <router-link to="/collection">Collection</router-link> >
        <span>{{ product.title }}</span>
      </div>

      <!-- Основной блок товара -->
      <div class="product-grid">
        <!-- Левая колонка - галерея -->
        <div class="product-gallery">
          <div class="main-image">
            <img :src="mainImage" :alt="product.title">
            <button class="favorite-btn" @click="toggleFavorite">
              <svg width="28" height="28" viewBox="0 0 24 24" 
                :fill="isFavorite ? '#FF0000' : 'none'" 
                stroke="#FF0000" stroke-width="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          
          <!-- Миниатюры -->
          <div class="thumbnails">
            <div 
              v-for="(img, index) in product.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: mainImage === img }"
              @click="mainImage = img"
            >
              <img :src="img" :alt="`${product.title} ${index + 1}`">
            </div>
          </div>
        </div>

        <!-- Правая колонка - информация -->
        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-category">{{ product.category }}</p>
          
          <div class="product-price">${{ product.price }}</div>
          
          <div class="product-rating">
            <div class="stars">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= product.rating }">★</span>
            </div>
            <span class="reviews-count">({{ product.reviews }} reviews)</span>
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
            <ul v-if="product.features">
              <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
            </ul>
          </div>

          <!-- Выбор размера -->
          <div class="size-selector">
            <h3>Size</h3>
            <div class="sizes">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                :class="{ selected: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Выбор цвета (если есть) -->
          <div v-if="product.colors" class="color-selector">
            <h3>Color</h3>
            <div class="colors">
              <button 
                v-for="color in product.colors" 
                :key="color.name"
                class="color-btn"
                :style="{ backgroundColor: color.code }"
                :class="{ selected: selectedColor === color.name }"
                @click="selectedColor = color.name"
                :title="color.name"
              ></button>
            </div>
          </div>

          <!-- Количество -->
          <div class="quantity-selector">
            <h3>Quantity</h3>
            <div class="quantity-controls">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="product-actions">
            <button class="add-to-cart" @click="addToCart">
              Add to Cart
            </button>
            <button class="buy-now" @click="buyNow">
              Buy Now
            </button>
          </div>

          <!-- Дополнительная информация -->
          <div class="product-meta">
            <p><strong>SKU:</strong> {{ product.sku }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Tags:</strong> 
              <span v-for="(tag, index) in product.tags" :key="index" class="tag">
                {{ tag }}{{ index < product.tags.length - 1 ? ', ' : '' }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Похожие товары -->
      <div class="related-products">
        <h2>You May Also Like</h2>
        <div class="related-grid">
          <ProductCard
            v-for="product in relatedProducts"
            :key="product.id"
            v-bind="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const productId = computed(() => parseInt(route.params.id))

// Состояния
const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)
const mainImage = ref('')
const isFavorite = ref(false)

// Данные товара (в реальном проекте будут из API)
const product = ref({
  id: 1,
  title: 'Tailored Stretch',
  category: 'Turn It Up Pants',
  price: 180,
  rating: 4,
  reviews: 24,
  description: 'Elevate your everyday style with these tailored stretch pants. Crafted from a premium blend of materials for ultimate comfort and sophisticated look. Perfect for both office wear and evening occasions.',
  features: [
    'Premium stretch fabric for maximum comfort',
    'Tailored fit that flatters your silhouette',
    'Hidden pockets for practicality',
    'Easy care - machine washable'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'Navy', code: '#000080' },
    { name: 'Beige', code: '#F5F5DC' }
  ],
  images: [
    '/product/01.jpg',
    '/product/01-detail1.jpg',
    '/product/01-detail2.jpg',
    '/product/01-detail3.jpg'
  ],
  sku: 'MS-2024-001',
  tags: ['pants', 'tailored', 'stretch', 'office wear']
})

// Устанавливаем главное изображение
mainImage.value = product.value.images[0]

// Методы
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  console.log('Added to cart:', {
    ...product.value,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  })
  alert('Product added to cart!')
}

const buyNow = () => {
  console.log('Buy now:', {
    ...product.value,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  })
  alert('Proceeding to checkout...')
}

// Похожие товары
const relatedProducts = ref([
  {
    id: 2,
    image: '/product/02.jpg',
    title: 'Technical Silk',
    category: 'Make A Splash',
    price: 120,
    isFavorite: false
  },
  {
    id: 3,
    image: '/product/03.jpg',
    title: 'Cool Weave',
    category: 'Anywhere Dress',
    price: 210,
    isFavorite: false
  },
  {
    id: 4,
    image: '/product/04.jpg',
    title: 'Cool Dress',
    category: 'Summer Collection',
    price: 195,
    isFavorite: false
  }
])
</script>

<style lang="scss" scoped>
$primary-green: #5A6D57;
$text-dark: #1A1A1A;
$text-light: #666666;
$white: #FFFFFF;
$border-light: #E5E5E5;

.product-page {
  padding: 40px 0 80px;
  background: $white;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

// Хлебные крошки
.breadcrumbs {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: $text-light;
  margin-bottom: 40px;
  
  a {
    color: $text-dark;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: $primary-green;
    }
  }
  
  span {
    color: $text-light;
  }
}

// Сетка товара
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
}

// Галерея
.product-gallery {
  .main-image {
    position: relative;
    width: 100%;
    height: 600px;
    margin-bottom: 20px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .favorite-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: $white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    
    .thumbnail {
      height: 120px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      &.active {
        border-color: $primary-green;
      }
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

// Информация о товаре
.product-info {
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    font-weight: 500;
    color: $text-dark;
    margin: 0 0 10px;
  }
  
  .product-category {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: $text-light;
    margin-bottom: 20px;
  }
  
  .product-price {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: $primary-green;
    margin-bottom: 20px;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    
    .stars {
      display: flex;
      gap: 2px;
      
      .star {
        color: #ddd;
        font-size: 18px;
        
        &.filled {
          color: #FFC107;
        }
      }
    }
    
    .reviews-count {
      color: $text-light;
      font-size: 14px;
    }
  }
  
  .product-description {
    margin-bottom: 30px;
    
    h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: $text-light;
      margin-bottom: 15px;
    }
    
    ul {
      padding-left: 20px;
      
      li {
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
        color: $text-light;
        margin-bottom: 8px;
      }
    }
  }
}

// Селекторы
.size-selector,
.color-selector,
.quantity-selector {
  margin-bottom: 25px;
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}

.sizes {
  display: flex;
  gap: 10px;
  
  button {
    width: 50px;
    height: 50px;
    border: 1px solid $border-light;
    background: $white;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: $primary-green;
    }
    
    &.selected {
      background: $primary-green;
      color: $white;
      border-color: $primary-green;
    }
  }
}

.colors {
  display: flex;
  gap: 10px;
  
  .color-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.selected {
      border-color: $primary-green;
      transform: scale(1.1);
    }
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  
  button {
    width: 40px;
    height: 40px;
    border: 1px solid $border-light;
    background: $white;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: $primary-green;
    }
  }
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    min-width: 30px;
    text-align: center;
  }
}

// Кнопки действий
.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  button {
    flex: 1;
    padding: 15px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .add-to-cart {
    background: $white;
    border: 2px solid $primary-green;
    color: $primary-green;
    
    &:hover {
      background: $primary-green;
      color: $white;
    }
  }
  
  .buy-now {
    background: $primary-green;
    border: 2px solid $primary-green;
    color: $white;
    
    &:hover {
      background: darken($primary-green, 10%);
      border-color: darken($primary-green, 10%);
    }
  }
}

// Мета информация
.product-meta {
  padding-top: 20px;
  border-top: 1px solid $border-light;
  
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: $text-light;
    margin-bottom: 8px;
    
    strong {
      color: $text-dark;
      font-weight: 600;
    }
  }
  
  .tag {
    color: $primary-green;
  }
}

// Похожие товары
.related-products {
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

// Адаптивность
@media (max-width: 1024px) {
  .product-grid {
    gap: 40px;
  }
  
  .product-gallery {
    .main-image {
      height: 500px;
    }
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .product-gallery {
    .main-image {
      height: 400px;
    }
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-gallery {
    .main-image {
      height: 350px;
    }
    
    .thumbnails {
      grid-template-columns: repeat(4, 1fr);
      
      .thumbnail {
        height: 80px;
      }
    }
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style>