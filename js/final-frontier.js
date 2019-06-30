/** final-frontier.js
 * JavaScript for the final frontier CMS app 
 * 
 * Place your custom JavaScript in this document 
 */

"use strict";

var closeButton = document.getElementById('close-button');
var expandButon = document.getElementById('expand-button');
var dialog = document.getElementById('content');
var contentArticle = document.getElementById('contentArticle');
var pics = document.getElementById('pics');

if(expandButon){
expandButon.addEventListener('click', function(){
    dialog.classList.add('expanded');
    if(pics){
        pics.classList.remove('flex-container');
        pics.classList.add('grid-container');
        var allPics = document.querySelectorAll('.pic');
        allPics.forEach(function(pic){
            pic.classList.remove('disappear');
        });
    }
    else{
        contentArticle.classList.add('maximize');
    }
    closeButton.classList.remove('disappear');
    expandButon.classList.add('disappear');
});
}
if(closeButton){
closeButton.addEventListener('click', function(){
    dialog.classList.remove('expanded');
    if(pics){
        pics.classList.add('flex-container');
        pics.classList.remove('grid-container');
        var allPics = document.querySelectorAll('.pic');
        allPics.forEach(function(pic){
            pic.classList.add('disappear');
        });
    }
    else{
        contentArticle.classList.remove('maximize');
    }
    closeButton.classList.add('disappear');
    expandButon.classList.remove('disappear');
});
}
