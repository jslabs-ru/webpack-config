const fs = require('fs');
const express = require('express');

const app = express();
const staticFileMiddleware = express.static('dist');

const PORT = parseInt(process.env.PORT) || 5000;

app.use(staticFileMiddleware);

const server = app.listen(PORT, function() {
    console.log('Server is running: http://localhost:%j', PORT);
});

process.on('message', (message) => {
    if (message === 'shutdown') {
        console.log('Stop express server');
        server.close(() => {
            process.exit();
        });
    }
});
