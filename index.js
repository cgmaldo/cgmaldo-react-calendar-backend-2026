const express = require('express')
const { dbConnection } = require('./database/config')

// Necesario para que se encuentre el servidor en versiones NodeJS superiores a la 22
// https://stackoverflow.com/questions/79873598/mongodb-atlas-srv-connection-fails-with-querysrv-econnrefused-after-switching-no
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require('dotenv').config()

// Crear servidor express
const app = express()
const cors = require('cors')

dbConnection()

// CORS
app.use(cors())

app.use(express.json())

// Lectura y parseo del body
app.use(express.static('public'))

// Rutas relacionadas con la autenticación
app.use('/api/auth', require('./routes/auth'))

// Rutas relacionadas con el CRUD eventos
app.use('/api/events', require('./routes/events'))

// Resto de rutas
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// })

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})






