
const Pemesanan = require('../models/pemesananmodel');

// POST /pemesanan
exports.create = async (req, res) => {
  try {
    const data = await Pemesanan.create(req.body);

    const hasil = await Pemesanan.findById(data._id)
      .populate('aulaId');

    res.status(201).json({
      status: 'success',
      message: 'Pemesanan berhasil ditambahkan',
      data: hasil
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'Kode pemesanan sudah digunakan'
      });
    }

    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// GET /pemesanan
exports.getAll = async (req, res) => {
  try {
    // FILTERING
    const filter = {};

    if (req.query.jenisAcara) {
      filter.jenisAcara = {
        $regex: req.query.jenisAcara,
        $options: 'i'
      };
    }

    if (req.query.aulaId) {
      filter.aulaId = req.query.aulaId;
    }

    // PAGINATION
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    // SORTING
    const allowedSort = [
      'kodePemesanan',
      'namaPenyewa',
      'jumlahTamu',
      'jenisAcara',
      'createdAt'
    ];

    const sortField = allowedSort.includes(req.query.sort)
      ? req.query.sort
      : 'createdAt';

    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    // PROJECTION
    const allowedFields = [
      'kodePemesanan',
      'namaPenyewa',
      'jumlahTamu',
      'jenisAcara',
      'kontak',
      'aulaId',
      'createdAt'
    ];

    let projection = '';

    if (req.query.fields) {
      const fields = req.query.fields
        .split(',')
        .filter(field => allowedFields.includes(field));

      projection = fields.join(' ');
    }

    const totalData = await Pemesanan.countDocuments(filter);

    const data = await Pemesanan.find(filter)
      .select(projection)
      .populate('aulaId')
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.json({
      status: 'success',
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalData / limit),
        totalData,
        limit
      },
      data
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// GET /pemesanan/:id
exports.getById = async (req, res) => {
  try {
    const data = await Pemesanan.findById(req.params.id)
      .populate('aulaId');

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Data pemesanan tidak ditemukan'
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
