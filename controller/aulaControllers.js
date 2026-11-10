
const Aula = require('../models/aulaModel');

// POST /aula
exports.create = async (req, res) => {
  try {
    const data = await Aula.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Data aula berhasil ditambahkan',
      data
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'Kode aula sudah digunakan'
      });
    }

    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// GET /aula
exports.getAll = async (req, res) => {
  try {
    const data = await Aula.find();

    res.json({
      status: 'success',
      total: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// GET /aula/:id
exports.getById = async (req, res) => {
  try {
    const data = await Aula.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Data aula tidak ditemukan'
      });
    }

    res.json({
      status: 'success',
      data
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};
