/** @module serveFile 
 * Provides a function for serving files in the public 
 * directory matching the pathname in the req.url 
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
var path = require('path');
var fs = require('fs');
var url = require('url');

module.exports = function serveFile(req, res) {
  //TODO: Implement serve file
  var pathname = url.parse(req.url).pathname;
  var filePath = path.join('public', pathname);
  fs.readFile(filePath, function(err, body){
    if(err) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }
    res.setHeader("Content-Length", body.length);
  
      switch(path.extname(filePath).toLowerCase()){
      case '.html':
      case '.htm':
        res.setHeader('Content-Type', 'text/html');
        break;
      case '.css':
        res.setHeader('Content-Type', 'text/css');
        break;
      case '.js':
        res.setHeader('Content-Type', 'text/javascript');
        break;
      case '.mp3':
        res.setHeader('Content-Type', 'audio/mpeg');
        break;
      case '.wav':
        res.setHeader('Content-Type', 'audio/wav');
        break;
      case '.mov':
        res.setHeader('Content-Type', 'video/quicktime');
        break;
      case '.mp4':
        res.setHeader('Content-Type', 'video/mp4');
        break;
      case '.gif':
        res.setHeader('Content-Type', 'image/gif');
        break;
      case '.jpg':
      case '.jpeg':
        res.setHeader('Content-Type', 'image/jpeg');
        break;
      case '.png':
        res.setHeader('Content-Type', 'image/png');
        break;
      case '.pdf':
        res.setHeader('Content-Type', 'application/pdf');
        break;
      case '.ttf':
        res.setHeader('Content-Type', 'font/ttf');
        break;
      case '.woff':
        res.setHeader('Content-Type', 'font/woff');
        break;
      default:
        res.setHeader('Content-Type', 'application/octet-stream');
        break;
      }
      res.end(body);
  })

}
