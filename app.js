require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productosRouter = require('./routes/productos');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());

// Routes

app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/productos">ruta de productos</a>');
});

app.use('/api/v1/productos', productosRouter);

// Ruta de productos

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// ConnectDB
		await connectDB(process.env.MONGO_URI);
		app.listen(port,() => console.log(`El servidor está escuchando el puerto ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();