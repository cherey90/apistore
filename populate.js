require('dotenv').config()

const connectDB = require('./db/connect')
const Producto = require('./models/producto')

const jsonProductos = require('./productos.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Producto.deleteMany()
    await Producto.create(jsonProductos)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
