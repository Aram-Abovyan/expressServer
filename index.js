require('dotenv').config()

const express = require('express')
const { sequelize } = require('./models')
const admin = require('./router/admin.routes')

const app = express()

app.use(express.json())
app.use('/admin', admin)

const { PORT } = process.env
app.listen(PORT, async () => {
  console.log(`server run at port ${PORT}`)

  await sequelize.authenticate()
  console.log('database connected')
})