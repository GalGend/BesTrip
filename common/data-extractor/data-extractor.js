

var HTMLParser = require('fast-html-parser');

var axios = require('axios')


var getAverageTime=function(siteName){
    //https://www.google.co.il/search?dcr=0&source=hp&q=The+london+eye&oq=The+london+eye
    axios.get('https://www.google.co.il/search?dcr=0&source=hp&q=The+london+eye&oq=The+london+eye')
    .then(function (response) {
        var htmlRes = HTMLParser.parse(response.data);
        var f = htmlRes.childNodes[0].querySelectorAll('#doc-info')
        console.log(f);
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports={
    getAverageTime:getAverageTime
}