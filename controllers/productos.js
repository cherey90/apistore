const Producto = require('..models/producto');

const getAllProductosStatic = async (req, res) => {
	const productos = await Producto.find({ precio: { $gt: 30 } })
		.sort('precio')
		.select('nombre precio');

	res.status(200).json({ productos, nbHits: productos.length });
};

const getAllProductos = async (req, res) => {
	const { destacados, compania, nombre, sort, fields, numericFilters } = req.query;
	const queryObjet = {};

	if (destacados) {
		queryObjet.destacados = destacados === 'true' ? true : false;
	}
	if (compania) {
		queryObjet.compania = compania;
	}
	if (nombre) {
		queryObjet.nombre = { $regex: nombre, $options: 'i' };
	}
	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': 'gte',
			'=': 'eq',
			'<': '$lt',
			'<=': 'lte',
		};
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ['precio', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObjet[field] = { [operator]: Number(value) };
			}
		});
	}

	let result = Producto.find(queryObject);
	// Sort
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const productos = await result;
	res.status(200).json({ productos, nbHits: productos.length });
};

module.exports = {
	getAllProductos,
	getAllProductosStatic,
};