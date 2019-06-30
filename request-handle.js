const serveFile = require('./serve-file');

/** @module requestHandler 
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
module.exports = function requestHandler(req, res) {
  // TODO: Add response handling
  if(req.method !== 'GET') {
    res.statusCode = 501;
    res.statusMessage = "Not Implemented";
    res.end();
    return;
  }
  serveFile(req, res);
}