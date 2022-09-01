const http = require('http');
const https = require('https');
const url = require('url');





module.exports = app => {


    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH');
        res.append('Access-Control-Allow-Headers', '*');
        res.append('Access-Control-Expose-Headers', '*');
        res.append('X-Proxy-Response', 'true');
        next();
    });

    app.use('/proxy', (request, response) => {
        request.pause();
        var options = url.parse(request.url.substr(1))
        options.headers = request.headers;
        options.headers.host = false;
        options.method = request.method;
        options.agent = false;

        // console.log(">> proxying : ", options)

        var connector = (options.protocol === "https:" ? https : http).request(options, function (serverResponse) {
            serverResponse.pause();
            response.writeHeader(serverResponse.statusCode, serverResponse.headers);
            serverResponse.pipe(response);
            serverResponse.resume();
        }).on('error', e => {
            // we got an error
            console.error(e);
            try {
                // attempt to set error message and http status
                response.writeHead(500);
                // response.write(`<script>console.log(json.parse(${JSON.stringify(request)}))</script>`);
                response.write(e.message);
            } catch (e) {
                // ignore
            }
            response.end();
        });

        request.pipe(connector);
        request.resume();
    })
};