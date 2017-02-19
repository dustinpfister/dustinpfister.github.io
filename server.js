/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 */

var http = require("http"),
fs = require("fs"),
port = process.argv[2] || 8888;

http.createServer(function (req, res) {

    var filename = req.url != '/' ? '.' + req.url : 'index.html',
    last = filename.split('/');

    if (last.length > 1) {

        last = last[last.length - 1];

    } else {

        last = last[0];

    }

    if (last.indexOf('.') === -1) {

        filename += '/index.html';

    }

    if (filename.indexOf('?') > 0) {

        filename = filename.split('?')[0];

    }

    fs.readFile(filename, "binary", function (err, file) {
        if (err) {

            res.writeHead(500, {
                "Content-Type" : "text/plain"
            });
            res.write(err + "\n");
            res.end();
            return;
        }

        res.writeHead(200);
        res.write(file, "binary");
        res.end();
    });

}).listen(parseInt(port, 10));

console.log('server.js is alive.');
