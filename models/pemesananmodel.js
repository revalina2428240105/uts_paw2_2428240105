
const mongoose = require('mongoose');

// Schema kontak untuk embedding
const kontakSchema = new mongoose.Schema({
  telepon: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  }
}, { _id: false });

// Schema utama pemesanan
const pemesananSchema = new mongoose.Schema({
  kodePemesanan: {
    type: String,
    required: [true, 'kode pemesanan wajib diisi'],
    unique: true,
    trim: true
  },
  namaPenyewa: {
    type: String,
    required: [true, 'nama penyewa wajib diisi'],
    trim: true
  },
  jumlahTamu: {
    type: Number,
    required: [true, 'jumlah tamu wajib diisi'],
    min: [1, 'jumlah tamu minimal 1']
  },
  jenisAcara: {
    type: String,
    required: [true, 'jenis acara wajib diisi'],
    trim: true
  },

  // Embedding: kontak berada di dalam dokumen pemesanan
  kontak: kontakSchema,

  // Referencing: terhubung dengan model Aula
  aulaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aula',
    required: [true, 'aula wajib dipilih']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pemesanan', pemesananSchema);
