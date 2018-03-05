$(document).ready(function() {
  let anymodContainer = document.querySelector("main div[id^='anymod-']");
  if(anymodContainer == null || anymodContainer == undefined){
    console.log("\tFailed to find Anymod container.");
    return;
  }
  else{
    setTimeout(checkAnymodSuccess, 4500, anymodContainer);
  }
});

function checkAnymodSuccess(dynamicContent) {
  if(dynamicContent.innerText.length < 1){
    dynamicContent.innerText = "We're having trouble loading this content. Please refresh the page.";
    dynamicContent.classList += " text-center";
    console.log("\tUpdated the output.");
  }
  else{
    console.log("\tDynamic content loaded successfully!");
  }
}