const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/eventsdb', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Error!' + err)
    } else {
        console.log('Connected to Database Successfully')
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized Request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        res.status(401).send('Unauthorized Request')
    }
    req.userId = payload.subject
    next()
}


router.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})


router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log('Error!' + err)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else if (user.password != userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token })
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        }
    ]

    res.send(events)
})


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Ahmed",
            "description": "Hello Everyone",
            "date": "2021-06-01T18:25:43.511Z"
        }
    ]

    res.send(events)
})


module.exports = router