'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');
const DeepstreamServer = require('deepstream.io');
const C = DeepstreamServer.constants;

var fs = require('fs');
var key = fs.readFileSync('private.key');
var cert = fs.readFileSync('mydomain.crt');

const app = express();
const port = process.env.PORT || 8081;
const root = `${__dirname}/public`;
var options = {
    key: key,
    cert: cert
};
// serve statically through express
// TODO: serve through nginx later for better performance or use CDN
//app.use(express.static(root));

// start the main express server
// app.listen(port);

// route everthing else back to the index.html for the SPA to work nicely
// NOTE: it's important to load this after the /api route to not overwrite it
//app.use(fallback('index.html', {root}));

//var https = require('https');
//https.createServer(options, app).listen(8081); 

// setup deepstream server
const server = new DeepstreamServer({
  host: '0.0.0.0',
  port: 6020,
});

// start the server
server.start();
