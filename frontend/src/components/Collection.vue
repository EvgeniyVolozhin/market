<!-- frontend/src/components/Collection.vue -->
<template>
  <section class="collection">
    <div class="container">
      <!-- ЗАГОЛОВОК СЕКЦИИ -->
      <div class="section-header">
        <h2 class="section-title">Collection</h2>
      </div>

      <!-- СЕТКА ИЗОБРАЖЕНИЙ -->
      <div class="collection-grid">
        <!-- Левая колонка с большим изображением -->
        <div class="collection-left">
          <div class="collection-item large">
            <img src="./../../public/prewiew/collection-01.jpg" alt="Collection 1">
            <div class="collection-overlay">
              <span class="collection-category">Blouses</span>
            </div>
          </div>
        </div>

        <!-- Правая колонка с тремя изображениями -->
        <div class="collection-right">
          <!-- Верхнее правое изображение -->
          <div class="collection-item medium">
            <img src="./../../public/prewiew/collection-02.jpg" alt="Collection 2">
            <div class="collection-overlay">
              <span class="collection-category">FERRYS</span>
            </div>
          </div>
          
          <!-- Два нижних изображения в ряд -->
          <div class="collection-row">
            <div class="collection-item small">
              <img src="./../../public/prewiew/collection-03.jpg" alt="Collection 3">
              <div class="collection-overlay">
                <span class="collection-category">Pants</span>
              </div>
            </div>
            <div class="collection-item small">
              <img src="./../../public/prewiew/collection-04.jpg" alt="Collection 4">
              <div class="collection-overlay">
                <span class="collection-category">Dresses</span>
              </div>
            </div>
          </div>
          
          <!-- Дополнительная надпись Outwear (если нужно) -->
          <div class="collection-outwear">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Компонент без логики, только отображение
</script>

<style lang="scss" scoped>
$primary-green: #5A6D57;
$text-dark: #1A1A1A;
$text-light: #666666;
$white: #FFFFFF;
$overlay-bg: rgba(0, 0, 0, 0.3);

.collection {
  padding: 10px 0;
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
}

/* СЕТКА КОЛЛЕКЦИИ */
.collection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Две колонки равной ширины */
  gap: 24px;
  width: 100%;
}

/* Левая колонка (большое изображение) */
.collection-left {
  .collection-item.large {
    position: relative;
    width: 100%;
    height: 600px; /* Высота на всю правую колонку */
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover {
      img {
        transform: scale(1.05);
      }
      
      .collection-overlay {
        background: rgba(90, 109, 87, 0.8);
      }
    }
  }
}

/* Правая колонка */
.collection-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  /* Верхнее изображение */
  .collection-item.medium {
    position: relative;
    width: 100%;
    height: 284px; /* Примерно половина от 600px минус gap */
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover {
      img {
        transform: scale(1.05);
      }
      
      .collection-overlay {
        background: rgba(90, 109, 87, 0.8);
      }
    }
  }
  
  /* Ряд из двух маленьких изображений */
  .collection-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    
    .collection-item.small {
      position: relative;
      width: 100%;
      height: 284px; /* Такая же высота как у среднего */
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      &:hover {
        img {
          transform: scale(1.05);
        }
        
        .collection-overlay {
          background: rgba(90, 109, 87, 0.8);
        }
      }
    }
  }
}

/* Общие стили для всех элементов коллекции */
.collection-item {
  cursor: pointer;
  border-radius: 0; /* Прямые углы как в дизайне */
  
  .collection-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: $overlay-bg;
    padding: 20px;
    transition: background 0.3s ease;
    
    .collection-category {
      font-family: 'Montserrat', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: $white;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

/* Стили для Outwear (если нужно отдельно) */
.collection-outwear {
  text-align: right;
  margin-top: 10px;
  
  .outwear-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: $text-light;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid $text-light;
    padding-bottom: 5px;
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .container {
    padding: 0 20px;
  }
  
  .collection-left {
    .collection-item.large {
      height: 500px;
    }
  }
  
  .collection-right {
    .collection-item.medium,
    .collection-row .collection-item.small {
      height: 238px; /* Пропорционально меньше */
    }
  }
}

@media (max-width: 768px) {
  .collection-grid {
    grid-template-columns: 1fr; /* Одна колонка на планшетах */
  }
  
  .collection-left {
    .collection-item.large {
      height: 400px;
    }
  }
  
  .collection-right {
    .collection-item.medium {
      height: 300px;
    }
    
    .collection-row {
      .collection-item.small {
        height: 250px;
      }
    }
  }
}

@media (max-width: 480px) {
  .collection {
    padding: 60px 0;
  }
  
  .section-header {
    .section-title {
      font-size: 24px;
    }
  }
  
  .collection-right {
    .collection-row {
      grid-template-columns: 1fr; /* Одна колонка на мобильных */
      gap: 16px;
      
      .collection-item.small {
        height: 300px;
      }
    }
  }
}
</style>