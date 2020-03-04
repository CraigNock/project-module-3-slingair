'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request-promise');

const PORT = process.env.PORT || 8000;

const {seatCheckHandle, confirmedHandle, flightListHandle, reservationHandle, passengerHandle} = require('./handlers');

const {seats} = require('./test-data/flightSeating');
const {reservations} = require('./test-data/reservations');


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
    .get('/seat-select/flights', flightListHandle)

    .get('/seat-check/:flight', seatCheckHandle)

    .post('/confirmed', confirmedHandle)

    .post('/reservation', reservationHandle)

    .get('/passengers/:flight', passengerHandle)
    
    .get('/', (req, res) => {
        res.redirect('/seat-select')
    })
    .get('/*', (req, res) => {
        res.send('404')
    })

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));