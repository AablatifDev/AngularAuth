const express = require('express')
const cors = require('cors')

const PORT = 3000

const app = express()

app.use(cors())

const api = require('./routes/api')

app.use(express.json())

app.use('/api', api)

app.get('/', (req, res) => {
    res.send('Hi')
})



app.listen(PORT, () => {
    console.log('Server is Running on Port 3000')
})
