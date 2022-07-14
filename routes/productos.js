const express = require('express')
const router = express.Router()

const {
	getAllProductos,
	getAllProductosStatic,
} = require('../controllers/productos')

router.route('').get(getAllProductos)
router.route('static').get(getAllProductosStatic)

module.exports = router