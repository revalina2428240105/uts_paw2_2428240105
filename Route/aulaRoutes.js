const express = require('express');
const router = express.Router();

const aulaController = require('../controller/aulaControllers');

router.post('/', aulaController.create);
router.get('/', aulaController.getAll);
router.get('/:id', aulaController.getById);

module.exports = router;