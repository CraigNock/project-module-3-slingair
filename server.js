'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const {seats} = require('./test-data/flightSeating');
const {reservations} = require('./test-data/reservations');

let lastId = '';

const seatCheckHandle = (req, res) => {
    let flight = req.params.flight.toUpperCase();
    // console.log(seats[flight]);
    if (seats[flight] !== undefined){
        let flightSeats = seats[flight];
        res.status(200).send({
        status: '200',
        flightSeats: flightSeats
    });
    } else {
        console.log('flight not found');
        res.send({data: 'flight not found'});
    }
    
};

const confirmedHandle = (req, res) => {
    let data = req.body;
    console.log(data);
    res.status(200).send({
        status: '200',
        data: data
    })
};

const reservationHandle = (req, res) => {
    let resId = req.body;
    console.log(resId.resId);
    resId = resId.resId
    let userData = grabReserve(resId);
    console.log(userData);
    res.status(200).send({
        status: '200',
        userData: userData
    })
};

const grabReserve = (rId) => {
    let index = reservations.findIndex(user => user.id === rId);
    console.log(index);
    return reservations[index];
};


express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    
    // endpoints

    .get('/seat-check/:flight', seatCheckHandle)

    .post('/confirmed', confirmedHandle)

    .post('/reservation', reservationHandle)

    .get('/', (req, res) => {
        res.redirect('/seat-select')
    })
    .get('/*', (req, res) => {
        res.send('404')
    })

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));