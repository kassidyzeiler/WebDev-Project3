const fs = require('fs');
const url = require('url');
const path = require('path');
const serveFile = require('./serve-file');
const parseBody = require('./src/parse-body');
//const interpretServerPage = require('./interpret-server-page');


/** @module requestHandler 
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
module.exports = function requestHandler(req, res) {
  //Response handling
  switch(req.method){
    case 'GET':
      //Serve file
      serveFile(req, res);
      break;
    case 'POST':
      handlePostRequest(req, res);
      break;
    default:
      res.statusCode = 501;
      res.statusMessage = "Not Implemented";
      res.end();
  }
}

function handlePostRequest(req, res) {
  // Parse the request body 
  parseBody(req, res, function(req, res) {
    // TODO: Save the file
    var pathname = url.parse(req.url).pathname;
      console.log(pathname);
    
      //switch statement dependent on which form was selected
      switch(pathname) {
              
        //Gallery uploading 
        case '/uploadGallery':
           console.log(req.body);
            var images = req.body.image.map(function(image) {
              return "media/images/" + decodeURI(image.filename);
            });
            var cards = [];
            try {
                cards = JSON.parse(fs.readFileSync('data/cards.json').toString());
            } catch {}            cards[cards.length] = {"id":cards.length+1, "type":"gallery","title":req.body.title,"description":req.body.description,"images":images};
            fs.writeFileSync('data/cards.json', JSON.stringify(cards));
            req.body.image.forEach(function(image) {
              fs.writeFileSync("public/media/images/" + image.filename, image.data);
            });
            
           // Redirect to main page
           res.statusCode = 303;
           res.statusMessage = "See Other";
           res.setHeader("Location", "/");
           res.end();

            break;
         
         //Article uploading
         case '/uploadArticle':
           console.log(req.body);
            var cards = [];
            try {
                cards = JSON.parse(fs.readFileSync('data/cards.json').toString());
            } catch {}
            cards[cards.length] = {"id":cards.length+1, "type":"article","title":req.body.title,"body":req.body.body};
            fs.writeFileSync('data/cards.json', JSON.stringify(cards));
            
           // Redirect to main page
           res.statusCode = 303;
           res.statusMessage = "See Other";
           res.setHeader("Location", "/");
           res.end();

            break;
            
        //Audio uploading
        case '/uploadAudio':
           console.log(req.body);
            var audio = "media/audio/" + req.body.audio.filename;
            var cards = [];
            try {
                cards = JSON.parse(fs.readFileSync('data/cards.json').toString());
            } catch {}            cards[cards.length] = {"id":cards.length+1, "type":"audio","title":req.body.title,"description":req.body.description,"source":audio};
            fs.writeFileSync('data/cards.json', JSON.stringify(cards));
            fs.writeFileSync("public/media/audio/" + req.body.audio.filename, req.body.audio.data);
            
           // Redirect to main page
           res.statusCode = 303;
           res.statusMessage = "See Other";
           res.setHeader("Location", "/");
           res.end();

           break;
            
        //Video uploading
        case '/uploadVideo':
            console.log(req.body);
            var video = "media/video/" + req.body.video.filename;
            var cards = [];
            try {
                cards = JSON.parse(fs.readFileSync('data/cards.json').toString());
            } catch {}            cards[cards.length] = {"id":cards.length+1, "type":"video","title":req.body.title,"description":req.body.description,"source":video};
            fs.writeFileSync('data/cards.json', JSON.stringify(cards));
            fs.writeFileSync("public/media/video/" + req.body.video.filename, req.body.video.data);
            
           // Redirect to main page
           res.statusCode = 303;
           res.statusMessage = "See Other";
           res.setHeader("Location", "/");
           res.end();

            break;
        default:
            res.statusCode = 500;
            res.statusMessage = "Server Error";
            res.end();
            return;
      }
  });
}
