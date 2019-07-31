/** @function generateCardHTML 
 * Generates the appropriate HTML for the supplied card data 
 * @param {object} cardData - An object describing a card 
 * @returns {string} the generated HTML 
 */
module.exports = function generateCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    switch(cardData.type) {
        case "audio":
            return generateAudioCardHTML(cardData);
            break;
        case "article":
            return generateArticleCardHTML(cardData);
            break;
        case "gallery":
            return generateGalleryCardHTML(cardData);
            break;
        case "video":
            return generateVideoCardHTML(cardData);
            break;
        default:
            return "";
    }
}

/** @function generateAudioCardHTML
 * A helper function to generate audio card HTML 
 * @param {object} cardData - the audio card data 
 * @returns {string} the generated html 
 */
function generateAudioCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var title = cardData.title;
    var content = cardData.description;
    var source = cardData.source;
    var value = `
        <div id="content" class="card">
            <h2 align="center">${title}</h2>
            <audio controls> 
                <source src="${source}" type="audio/mpeg">
            </audio>
            <div class="contentAudio">
               <pre>${content}</pre>                 
            </div> 
        </div>
    `;
    return value;
}

/** @function generateArticleCardHTML
 * A helper function to generate article card HTML 
 * @param {object} cardData - the article card data 
 * @returns {string} the generated html 
 */
function generateArticleCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var title = cardData.title;
    var content = cardData.body;
    var value = `
        <div id='content-article' class= "card">  
            <div id="article">
                <h2 align="center">` + title + `</h2>
                <button class="close-button disappear" id="close-button-article">Close</button>
                <div class="contentArticle" id="contentArticle">` + content + `</div>
                <div class="readMore">            
                    <button id="expand-button-article">Read More</button>
                </div>
            </div>  
        </div>
    `;
    return value;
}

/** @function generateGalleryCardHTML
 * A helper function to generate gallery card HTML 
 * @param {object} cardData - the gallery card data 
 * @returns {string} the generated html 
 */
function generateGalleryCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var title = cardData.title;
    var content = cardData.description;
    var images = cardData.images.map(function(item) {
      return `<img src="` + item + `" id="one" class="pic disappear">`;
    });        
    var value = `
        <div id="content-gallery" class="card">
            <h2 align="center">` + title + `</h2>
            <button class="close-button disappear" id="close-button-gallery">Close</button>
            <div class="flex-container" id="pics">
                <div class="contentGallery">` + content + `</div>
                ` + images.join("") + `</div>
            <div class="gallery">
                <button class="seeGallery-button" id="expand-button-gallery">See Gallery</button>
            </div>
        </div> 
    `;
    return value;
}

/** @function generateVideoCardHTML
 * A helper function to generate video card HTML 
 * @param {object} cardData - the video card data 
 * @returns {string} the generated html 
 */
function generateVideoCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var title = cardData.title;
    var content = cardData.description;
    var source = cardData.source;
    var value = `
        <div id="content" class="card">
            <h2 align="center">` + title + `</h2>
            <video class="video" controls>
                <source src="` + source + `" type="video/mp4">
            </video>
            <div class="contentVideo">
                <pre>` + content + `</pre>
            </div>
        </div> 
    `;
    return value;
}