const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if (req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age: 40},
    //         { name: 'Grace Smith', age: 30},
    //     ];
    //     fs.readFile(
    //         path.join(__dirname, 'public', 'home.html'),
    //         (err, contents) => {
    //             if (err) throw err;
    //             res.writeHead(200, { 'Content-Type': 'application/json' });
    //             res.end(JSON.stringify(users));
    //             res.end('Request done');
    //         }
    //     );
    // }
   
    let filePath = path.join(
        __dirname, 
        'public', 
        req.url === '/' ? 'home.html' : req.url
    );

    let extname = path.extname(filePath);

    let contentType = 'text/html';
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }
    
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if (err.code == 'ENOENT') {

                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'ContentType': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'ContentType': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 500;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));