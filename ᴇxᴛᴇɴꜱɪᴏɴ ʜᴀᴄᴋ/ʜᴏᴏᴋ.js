function callback(details) { 
    console.trace(details);
    const file = details.url.substring(details.url.lastIndexOf('/') + 1);
    return {
        //cancel: true, /*Cannot cancel while other methods*/
        redirectUrl: chrome.runtime.getURL(file)
    }; 
}

chrome.webRequest.onBeforeRequest.addListener(callback,
    {urls: ["*://krunker.io/libs*"],
    types: ["script"]},//, "xmlhttprequest"
    ["blocking"]);
