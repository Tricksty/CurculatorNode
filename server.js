const fs = require('fs').promises;
const express = require('express');
const server = express();
const PORT = 3000;
const path = require('path')
const cors = require('cors');

server.use(express.static('static'));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors({
    origin: '*',
}));

const ApiRtr = require('./router/Api');
server.use('/api', ApiRtr);

server.use('/', async (req, res, next) => {
    let headHTML = await fs.readFile(path.join(__dirname, 'templates', 'head.html'));
    req.head = headHTML.toString();
    next();
})

server.get('/', async function (req, res) {
    let html = await fs.readFile(path.join(__dirname, 'templates', 'index.html'));
    html = html.toString().replace('{% include "head.html" %}', req.head);
    res.send(html)
})

server.get('/head', async function (req, res) {
    res.sendFile(__dirname, 'templates', 'head.html')
})

server.listen(PORT, function() {
    console.log('Nagatoro is ready on: http://localhost:3000');
})