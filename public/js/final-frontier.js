/** final-frontier.js
 * JavaScript for the final frontier CMS app 
 * 
 * Place your custom JavaScript in this document 
 */

"use strict";

var closeButtonArticle = document.getElementById('close-button-article');
var expandButonArticle = document.getElementById('expand-button-article');
var dialogArticle = document.getElementById('content-article');
var contentArticle = document.getElementById('contentArticle');

var closeButtonGallery = document.getElementById('close-button-gallery');
var expandButonGallery = document.getElementById('expand-button-gallery');
var dialogGallery = document.getElementById('content-gallery');
var pics = document.getElementById('pics');

if(expandButonArticle){
expandButonArticle.addEventListener('click', function(){
    dialogArticle.classList.add('expanded');
    contentArticle.classList.add('maximize');
    closeButtonArticle.classList.remove('disappear');
    expandButonArticle.classList.add('disappear');
});
}
if(closeButtonArticle){
closeButtonArticle.addEventListener('click', function(){
    dialogArticle.classList.remove('expanded');
    contentArticle.classList.remove('maximize');
    closeButtonArticle.classList.add('disappear');
    expandButonArticle.classList.remove('disappear');
});
    
}if(expandButonGallery){
expandButonGallery.addEventListener('click', function(){
    dialogGallery.classList.add('expanded');
    pics.classList.remove('flex-container');
    pics.classList.add('grid-container');
    var allPics = document.querySelectorAll('.pic');
    allPics.forEach(function(pic){
        pic.classList.remove('disappear');
    });
    closeButtonGallery.classList.remove('disappear');
    expandButonGallery.classList.add('disappear');
});
}
if(closeButtonGallery){
closeButtonGallery.addEventListener('click', function(){
    dialogGallery.classList.remove('expanded');
    pics.classList.add('flex-container');
    pics.classList.remove('grid-container');
    var allPics = document.querySelectorAll('.pic');
    allPics.forEach(function(pic){
        pic.classList.add('disappear');
    });

    closeButtonGallery.classList.add('disappear');
    expandButonGallery.classList.remove('disappear');
});
}
