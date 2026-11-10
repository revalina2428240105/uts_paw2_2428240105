
const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'kode aula wajib diisi'],
    unique: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'nama aula wajib diisi'],
    trim: true
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('Aula', aulaSchema);
