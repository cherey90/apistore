const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: [true, 'se debe proporcionar el nombre del producto'],
	},
	precio: {
		type: Number,
		required: [true, 'se debe proporcionar el precio del producto'],
	},
	destacados: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	compania: {
		type: String,
		enum: {
			values: ['adidas', 'nike', 'puma', 'topper'],
			message: '{VALUE} no es soportado',
		},
	},
})

module.exports = mongoose.model('Producto', productoSchema)