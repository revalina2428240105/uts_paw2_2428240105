const express = require('express');
const router = express.Router();

const pemesananController = require('../controller/pemesananControllers');

router.post('/', pemesananController.create);
router.get('/', pemesananController.getAll);
router.get('/:id', pemesananController.getById);

module.exports = router;
