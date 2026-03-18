require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends: true}))


const productRoutes = require('./routes/productRoutes')

app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
    res.json({status: 'OK', message: 'Server in running'})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`📦 API товаров: http://localhost:${PORT}/api/products`);
} )