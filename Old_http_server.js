const http = require('http');
const url = require('url');

const port = 8000;

const server = http.createServer((req, res) => {
    // Parse the URL and query string
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Check for the correct path and method
    if (pathname === '/COMP4537/labs/3/getDate/' && req.method === 'GET') {
        const name = query.name; // Extract the 'name' query parameter
        const date = new Date(); // Get the current date and time

        // Set the response header to send HTML content with charset utf-8
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        // Send the response with in-line CSS for blue text
        res.end(`<p style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${date}</p>`);
    } else {
        // Handle not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
