<template>
    <header>
        <div class="top-bar">
            <div class="container">
                <p class="shipping-text">
                    Enjoy Free Shipping On All Orders
                </p>
            </div>
        </div>


        <div class="main-header">
            <div class="container">
                <div class="logo">
                    <div class="logo-top">
                        <span class="logo-text">
                            <img src="./../../public/header/modimal.png" alt="modimal">
                        </span>
                        <span class="logo-icon">
                            <img src="./../../public/header/logo.png" alt="logo">
                        </span>
                    </div>
                    <span class="logo-bottom">women clothing</span>
                </div>

                <nav class="nav-menu">
                    <router-link to="/" class="nav-link" active-class="active">Collection</router-link>
                    <router-link to="/modiweek" class="nav-link" active-class="active">Modiweek</router-link>
                    <router-link to="/plus-size" class="nav-link" active-class="active">Plus Size</router-link>
                    <router-link to="/sustainability" class="nav-link"
                        active-class="active">Sustainability</router-link>
                </nav>

                <div class="actions">
                    <!-- Разделил на отдельные кнопки для каждой иконки -->
                    <button class="action-btn" aria-label="Search">
                        <img src="./../../public/header/icon/1.svg" alt="search">
                    </button>
                    <button class="action-btn" aria-label="User">
                        <img src="./../../public/header/icon/2.svg" alt="user">
                    </button>
                    <button class="action-btn" aria-label="Wishlist">
                        <img src="./../../public/header/icon/3.svg" alt="wishlist">
                    </button>
                    <button class="action-btn" aria-label="Cart">
                        <img src="./../../public/header/icon/4.svg" alt="cart">
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
$primary-green: #5A6D57;
$text-dark: #1A1A1A;
$text-light: #666666;
$white: #FFFFFF;
$border-light: #E5E5E5;

.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    width: 100%;
}

.top-bar {
    height: 30px;
    background-color: $primary-green;
    display: flex;
    align-items: center;
    color: $white;
}

.shipping-text {
    font-family: Montserrat;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.8px;
    text-align: center;
}

.main-header {
    height: 110px;
    background-color: $white;
    border-bottom: 1px solid $border-light; //&&&
    display: flex;
    align-items: center;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.logo {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .logo-top {
        display: flex;
        align-items: flex-end;
        gap: 8px;

    }

    .logo-text {
        display: flex;
        align-items: center;
        line-height: 0;
    }

    .logo-icon {
        display: flex;
        align-items: center;
        line-height: 0;

        img {
            display: block;
            height: 12px;
            width: auto;
        }
    }

    .logo-bottom {
        font-weight: 500;
        font-size: 10px;
        line-height: 12.5px;
        letter-spacing: 0.1em;
        text-align: center;
        text-transform: uppercase;
        margin: 0;
    }
}

.nav-menu {
    display: flex;
    gap: 30px;
}

.nav-link {
    text-decoration: none;
    color: #404040;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 180%;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    position: relative;
    text-align: center;
    text-transform: capitalize;
    margin: 0;
}

.actions {
    display: flex;
    gap: 24px;
    /* gap между иконками 24px */
    width: 184px;
    /* контейнер шириной 184px */
    height: 32px;
    /* контейнер высотой 32px */
    padding: 4px 0 4px 8px;
    /* маржин: top 4px, bottom 4px, left 8px (справа 0) */
    box-sizing: border-box;
    /* чтобы padding не увеличивал общий размер */

    .action-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
        line-height: 0;
        width: 24px;
        height: 24px;


    }
}

@media (max-width: 1024px) {
    .container {
        padding: 0 20px;
    }
    
    .nav-menu {
        gap: 20px;
    }
    
    .actions {
        gap: 16px;
        width: auto;
    }
}

@media (max-width: 768px) {
    .main-header {
        height: auto;
        padding: 15px 0;
        
        .container {
            flex-direction: column;
            gap: 15px;
        }
    }
    
    .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .actions {
        height: auto;
        padding: 4px 0;
        justify-content: center;
    }
}
</style>