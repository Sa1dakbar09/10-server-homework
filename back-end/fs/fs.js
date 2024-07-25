const { v4 } = require('uuid');
const fs = require('fs');

function reader_files(fileName) {
    fileName.trim();
    fileName.toLowerCase();
    const file = fs.readFileSync(`./base/${fileName}.json`, 'utf-8');
    return JSON.parse(file);
}

function writeFiles(fileName, data) {
    data = JSON.stringify(data)
    fs.writeFileSync(`./base/${fileName}.json`, data, 'utf-8');
}

function Header(res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
}

function errMsg(res) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    return res.end('404 not found.')
}

function getEm(url, res) {
    const list = reader_files(url)
    Header(res);
    return res.end(JSON.stringify(list))
}

function createEM(req, res, what) {
    req.on('data', (chunk) => {
        const data = JSON.parse(chunk);
        const list = reader_files(what);
        list.push({
            id: v4(),
            ...data
        })
        writeFiles(what, list);
        let str = what + ' is created !!'
        return res.end(str)
    })
}

module.exports = { errMsg, getEm, writeFiles, reader_files, createEM }