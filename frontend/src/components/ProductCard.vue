<!-- frontend/src/components/ProductCard.vue -->
<template>
    <div class="product-card">
        <div class="product-image">
            <img :src="image" :alt="title">

            <!-- КНОПКА С СЕРДЕЧКОМ (ИЗБРАННОЕ) -->
            <button class="favorite-btn" @click.stop="$emit('toggleFavorite')">
                <!-- Неактивное сердечко (пустое) -->
                <svg v-if="!isFavorite" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>

                <!-- Активное сердечко (заполненное красным) -->
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="#FF0000" stroke="#FF0000" stroke-width="2">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </button>

            <!-- Кнопка быстрого просмотра - ведет на страницу товара -->
            <button class="quick-view" @click="goToProduct">Quick View</button>
        </div>

        <div class="product-info">
            <h3 class="product-title">{{ title }}</h3>
            <p class="product-category">{{ category }}</p>
            <p class="product-price">${{ price }}</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const imageUrl = computed(() => {
    // Если image начинается с http, оставляем как есть
    if (props.image.startsWith('http')) {
        return props.image;
    }
    // Иначе добавляем базовый URL
    return `http://localhost:5000${props.image}`;
});

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggleFavorite'])
const router = useRouter()

// Переход на страницу товара
const goToProduct = () => {
    router.push(`/product/${props.id}`)
}
</script>

<style lang="scss" scoped>
$primary-green: #5A6D57;
$text-dark: #1A1A1A;
$text-light: #666666;
$white: #FFFFFF;

.product-card {
    flex: 0 0 calc((100% - 48px) / 3);
    min-width: 0;
    background: $white;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);

        .quick-view {
            opacity: 1;
            visibility: visible;
        }
    }
}

.product-image {
    position: relative;
    width: 100%;
    height: 450px;
    overflow: hidden;
    margin-bottom: 20px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
    }

    .favorite-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: $white;
        border: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: $text-dark;
        transition: all 0.3s ease;
        z-index: 2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: scale(1.1);

            svg {
                stroke: $primary-green;
            }
        }

        svg {
            transition: all 0.3s ease;
        }
    }

    .quick-view {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: $white;
        border: none;
        padding: 12px 30px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: $text-dark;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        &:hover {
            background: $primary-green;
            color: $white;
        }
    }
}

.product-info {
    text-align: left;
    padding: 0 5px;

    .product-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: $text-dark;
        margin: 0 0 5px 0;
    }

    .product-category {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: $text-light;
        margin: 0 0 10px 0;
    }

    .product-price {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: $text-dark;
        margin: 0;
    }
}

@media (max-width: 768px) {
    .product-card {
        flex: 0 0 calc((100% - 32px) / 2);
    }

    .product-image {
        height: 350px;

        .quick-view {
            padding: 10px 25px;
            font-size: 13px;
        }

        .favorite-btn {
            width: 40px;
            height: 40px;
            top: 15px;
            right: 15px;
        }
    }

    .product-info {
        .product-title {
            font-size: 16px;
        }

        .product-category {
            font-size: 13px;
        }

        .product-price {
            font-size: 18px;
        }
    }
}

@media (max-width: 480px) {
    .product-card {
        flex: 0 0 100%;
    }

    .product-image {
        height: 400px;
    }
}
</style>