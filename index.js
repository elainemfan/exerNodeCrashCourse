// const Person = require('./person');

// const person1 = new Person('John Doe', 30);

// person1.greeting();

// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener', data));

// logger.log('Hello World');

const http = require('http');
const path = require('path');
const fs = requrie('fs');

const server = http.createServer((req, res) => {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, 
    //         content) => {
    //             if (err) throw err;
    //             res.writeHead(200, { 'Content_type': 'test/html'})
    //             res.end('<h1>Home</h1>');
    //          }
    //     );
    // }

    // if (req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age 40}
    //         { name: 'John Doe', age 30}  
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' :req.url);

    // console.log(filePath);
    // res.end();

    let extname = path.extname(filePath);

    let contentType = 'text/html';

    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break; 
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(fielPath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)
                => {
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            }else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
            }
            else {
                res.writeHead(200, {'Content-Type': contentType });
                res.end(content, 'utf8');
        }
    })
});

const PORT = process.env.Port || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));