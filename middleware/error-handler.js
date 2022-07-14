const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: 'Algo salió mal. Por favor, vuelva a intentarlo' })
}

module.exports = errorHandlerMiddleware
