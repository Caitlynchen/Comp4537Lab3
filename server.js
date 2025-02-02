const https = require('https');
const fs = require('fs');
const url = require('url');
const { getDate } = require('./modules/utils');

const port = process.env.PORT || 443;

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

const server = https.createServer(options, (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    // Normalize and extract segments from the pathname
    const pathSegments = pathname.split('/').filter(seg => seg.length > 0);

    if (pathname === '/COMP4537/labs/3/getDate/' && req.method === 'GET') {
        const name = query.name;
        if (!name) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request: Name is required');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(getDate(name));
    }else if (pathname === '/COMP4537/labs/3/writeFile/' && req.method === 'GET') {
        const text = query.text;
        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request: Text is required');
            return;
        }

        fs.appendFile('file.txt', text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error: Unable to write to file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Text appended successfully');
        });
    }else if (pathname.startsWith('/COMP4537/labs/3/readFile/') && req.method === 'GET') {
        const filename = pathSegments.pop();  

        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found: ' + filename + ' not found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data.replace(/\n/g, '<br>')); 
        });
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
