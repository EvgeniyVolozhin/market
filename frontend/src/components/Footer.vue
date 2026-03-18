<!-- frontend/src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="container">
      <!-- ССЫЛКИ НА СОЦСЕТИ -->
      <div class="social-links">
        <a href="https://www.instagram.com/" class="social-link" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://www.facebook.com/?locale=ru_RU" class="social-link" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a href="https://x.com/?lang=ru" class="social-link" aria-label="Twitter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </a>
      </div>

      <!-- КОПИРАЙТ -->
      <div class="copyright">
        <p>{{ currentYear }} modimal. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// Текущий год для копирайта
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
$black: #000000;
$white: #FFFFFF;
$gray: #999999;

.footer {
  background: $black;
  padding: 40px 0;
  width: 100%;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ССЫЛКИ НА СОЦСЕТИ */
.social-links {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  
  .social-link {
    color: $white;
    transition: all 0.3s ease;
    
    &:hover {
      color: $gray;
      transform: translateY(-2px);
    }
    
    svg {
      display: block;
    }
  }
}

/* КОПИРАЙТ */
.copyright {
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: $white;
    margin: 0;
    letter-spacing: 0.5px;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .footer {
    padding: 30px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .social-links {
    gap: 25px;
    
    .social-link svg {
      width: 18px;
      height: 18px;
    }
  }
  
  .copyright p {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .social-links {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>