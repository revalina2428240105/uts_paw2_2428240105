
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const aulaRoutes = require('./Route/aulaRoutes');
const pemesananRoutes = require('./Route/pemesananRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Halaman utama
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'RESTful API Persewaan Aula berjalan!',
        mahasiswa: 'Reva Lina',
        npm: '2428240105',
        endpoint: {
            aula: '/aula',
            pemesanan: '/pemesanan'
        }
    });
});

// Routes
app.use('/aula', aulaRoutes);
app.use('/pemesanan', pemesananRoutes);

// Route tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan`
    });
});

// Koneksi MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB berhasil terhubung!');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Koneksi MongoDB gagal:', err.message);
    });
