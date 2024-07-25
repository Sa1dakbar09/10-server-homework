const http = require('http');
const { errMsg, getEm, createEM } = require('./fs/fs');

const App = http.createServer(function (req, res) {

    if (req.url == '/') {
        res.end('Cannot get here /')
    }

    if (req.method == 'GET') {
        if (req.url == '/users') {
            getEm('users', res)
        } else if (req.url == '/cars') {
            getEm('cars', res)
        } else if (req.url == '/animals') {
            getEm('animals', res)
        } else {
            errMsg(res)
        }
    }

    if (req.method == 'POST') {
        if (req.url == '/create_users') {
            createEM(req, res, 'users');
        } else if (req.url == '/create_cars') {
            createEM(req, res, 'cars');
        } else if (req.url == '/create_animals') {
            createEM(req, res, 'animals');
        } else {
            errMsg(res)
        }
    }
}).listen(8080, () => {
    console.log('Server is working on 8080 !');
})