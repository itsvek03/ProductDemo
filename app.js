const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongostanize = require('express-mongo-sanitize')
const app = express()

const authRouter = require('./routes/authRoutes')
const catrouter = require('./routes/categoryRoutes')
const productroute = require('./routes/productRoutes')
const cartroute = require('./routes/cartroutes')
const visitroutes = require('./routes/visiroRoutes')
//const orderroute = require('./routes/orderroutes')

app.use('/uploads/', express.static("uploads"))


app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use(mongostanize())
app.use(xss())

app.use('/api/user', authRouter)
app.use('/api/category', catrouter)
app.use('/api/products', productroute)
app.use('/api/cart', cartroute)
app.use('/api/visitor', visitroutes)
//app.use('/api/orders', orderroute)

module.exports = app;