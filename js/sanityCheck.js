$(document).ready(function() {
	let dynamicContent = document.querySelector("main div[id^='anymod-']");
  if(dynamicContent == null || dynamicContent == undefined){
    console.log("\tFailed to find target container.");
    return;
  }
	if(dynamicContent.innerText.length < 1){
		dynamicContent.innerText = "We're having trouble loading this content. Please refresh the page.";
		dynamicContent.classList += " text-center";
    console.log("\tUpdated the output.");
	}
  else{
    console.log("\tDynamic content loaded successfully!");
  }
});

function loadAnymod(){
  var search = window.location.search || ''
  ,   project = "847N3P"
  ,   messageObj = { showToolkit: false, links: [] }
/*
  if (search.indexOf('project=') > -1) {
    project = search.split('project=')[1].split('&')[0]
  }

  if (!project) return console.warn('Missing project')
  if (!window.parent) return console.warn('No parent window detected')
  if (!document.referrer) return console.warn('Unable to detect parent window URL')
*/
  var decoded = decodeURIComponent(document.cookie).replace(/ /g, '').split(';')
  ,   referrerParser = document.createElement('a')
  referrerParser.href = document.referrer
  var referrerHostname = referrerParser.hostname

  if (!decoded || decoded.length < 1) return

  function processToken (token) {
    if (!token) return
    if (token.indexOf('cio.toolkit') === 0 && token.indexOf('|' + project + '|') > -1) {
      messageObj.activeToken = 'token'
      messageObj.showToolkit = true
      return
    }
    if (token.indexOf('cio.active.' + project + '|' + referrerHostname) === 0) {
      messageObj.activeLink = token.split('=')[1]
      messageObj.showToolkit = true
      return
    }
    if (token.indexOf('cio.solo.' + project + '|' + referrerHostname) === 0) {
      messageObj.soloInstance = token.split('=')[1]
      messageObj.showToolkit = true
      return
    }
    if (token.indexOf('cio.link.') !== 0) return
    var tokenKey = token.split('=')[0]
    ,   tokenValue = token.split('=')[1]
    ,   linkIdentifier = tokenKey.split('.')[2]
    ,   projectIdentifier = tokenKey.split('.')[3]
    ,   parser = document.createElement('a')
    parser.href = tokenValue
    if (projectIdentifier !== project) return
    if (parser.hostname === referrerHostname) {
      messageObj.links.push(linkIdentifier)
    }
  }

  for (var i = 0; i < decoded.length; i++) {
    processToken(decoded[i])
  }

  if (!messageObj.showToolkit) return

  window.parent.window.postMessage(messageObj, '*')
}