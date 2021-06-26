const fs = require('fs').promises;
const express = require('express');
const server = express();
const PORT = 3000;
const path = require('path')


const Adminrtr = require('./router/Admin');
server.use('/admin', Adminrtr);

server.use(express.static('static'));

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
    console.log('aaaaaaaaaaaaaaa');
})