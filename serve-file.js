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
//const cardsData = require('./data/cards.json');
const generateCardHTML = require('./src/generate-card-html.js');
const parseBody = require('./src/parse-body');

/** @module handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
module.exports = function handleRequest(req, res) {
  //TODO: Implement serve file
  var pathname = decodeURI(url.parse(req.url).pathname);
  var filePath = path.join('public', pathname);
  fs.stat(filePath, function(err, stats) {
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }
    
    // Serve the requested resource
    // if it's in the file
    if(stats.isFile()) {
        console.log(filePath);
      serveFile(filePath, res, function(err){
        //Returns a 404 status code if there's an error          
        if(err) {
          console.error(err);
          res.statusCode = 404;
          res.statusMessage = "Not Found";
          res.end();
          return;
        }
      }); 
    //if it's in the directory
    } else if(stats.isDirectory()) {
        console.log(filePath);
        if(filePath == "public/") {
            serveFile(path.join(filePath, 'index.html'), res, function(err) {
                if(err) {
                    generateMainHTML(filePath, function(err, html) {
                        if(err) {
                            console.error(err);
                            res.statusCode = 404;
                            res.statusMessage = "Not Found";
                            res.end();
                            return;
                        }
                        // Serve html
                        res.setHeader("Content-Type", "text/html");
                        res.setHeader("Content-Length", html.length);
                        res.end(html);
                    });
                }
            }); 
        }else {
            serveIndex(filePath, res, function(err){
            //Returns a 404 status code if there's an error
            if(err) {
              console.error(err);
              res.statusCode = 404;
              res.statusMessage = "Not Found";
              res.end();
              return;
            }});
        }
      
    //Returns a 404 status code if it's not found
    } else {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
    }
    
  });

}

/** @module serveFile 
 * Provides a function for serving files in the public 
 * directory matching the pathname in the req.url 
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 * @param {serveIndexListing~callback} callback - a callback to 
 * invoke once execution finishes.
 */
function serveFile(filePath, res, callback) {
  fs.readFile(filePath, function(err, body){
    if(err) return callback(err);
      
    //Set the content-length
    res.setHeader("Content-Length", body.length);
      
    //Set the content-type
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
      //Serve the file data
      res.end(body);
  });
}

/** @function serveIndex()
 * Checks for an error before passing it to the next function
 * @param {string} directoryPath - the path to the directory 
 * @param {http.serverResponse} res - the repsonse object
 * @param {serveIndexListing~callback} callback - a callback to 
 * invoke once execution finishes.
 */
function serveIndex(dirPath, res, callback) {
  serveFile(path.join(dirPath, 'index.html'), res, function(err) {
    if(err) serveIndexListing(dirPath, res, callback);
  });
}

/** @callback serveIndexListing~callback
 * @param {string|object} err - any error that occured 
 */

/** @function serveIndexListing()
 * Serves a HTML list of directory contents 
 * @param {string} directoryPath - the path to the directory 
 * @param {http.serverResponse} res - the repsonse object
 * @param {serveIndexListing~callback} callback - a callback to 
 * invoke once execution finishes.
 */
function serveIndexListing(dirPath, res, callback) {
  generateIndexHTML(dirPath, function(err, html) {
    if(err) return callback(err); 
    // Serve html
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  });
}

/** @callback generateIndex~callback
 * @param {string|object} error - the error (if any)
 * @param {string} html - the directory listing as HTML text
 */

/** @function generateIndex 
 * Generates a HTML page listing the contents
 * of a directory. 
 * @param {string} dirPath - the path to the directory 
 * @param {generateIndex~callback} callback - a callback to invoke 
 * once execution completes.
 */
function generateIndexHTML(dirPath, callback) {
  fs.readdir(dirPath, function(err, items){
    if(err) return err;
    // Determine pathname 
    var pathname = path.join('', dirPath.split("public/")[1]);
    
     // Create Links
    var links = items.map(function(item) {
      return `<li><a href="${path.join(pathname, item)}">${item}</a></li>`;
    });
      
    // Generate HTML
    var html = `<!DOCTYPE html>
      <html>
        <head>
          <title>Index of ${pathname}</title>
        <head>
        <body>
          <h1>Index of ${pathname}</h1>
          <ul>
            ${links.join("")}
          <ul>
        </body>
      <html>`
    
    // Invoke callback
    callback(null, html);
  });
}

function generateMainHTML(dirPath, callback) {
  fs.readdir(dirPath, function(err, items){
    if(err) return err;
    
    // Determine pathname 
    var pathname = path.join('..', dirPath);
    
    var cardsData = [];
    try {
        cardsData = JSON.parse(fs.readFileSync('data/cards.json').toString());
    } catch {}
    // Create Links
    var cards = cardsData.map(function(card) {
      return generateCardHTML(card);
    });
    
    // Generate HTML
    var html = `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title>
        <h1>Final Frontier</h1>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../css/final-frontier.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
      <h1 class="title" align="center">Final Frontier</h1>
      <content>
          <form class="Searching" align="center">
              <input type="search" name="searchBar">
              <input type="submit" value="Search">
          </form>
      </content>
      <div class="grid-container">` + cards.join("") + `</div>
      <script src="../js/final-frontier.js"></script>
  </body>
</html>`
    
    // Invoke callback
    callback(null, html);
  });
}
