chrome.runtime.getPackageDirectoryEntry((root) => {
    let reader = root.createReader();
    reader.readEntries((results) => {
        searchDir(root, results);
    });
});
let swap = {
    filter: {
        urls: []
    },
    files: {}
};
let searchDir = (parent, directories) => {
    for (const directory of directories) {
        parent.getDirectory(directory.name, {
            create: false
        }, (dir) => {
            if (!dir.fullPath.includes("/crxfs/main")) {
                let useAssets = !["css", "img", "libs", "sounds"].some(cn => dir.fullPath.includes("/crxfs/" + cn));
                let reader = dir.createReader();
                reader.readEntries((results) => {
                    let newDirs = results.filter(x => x.isDirectory);
                    let files = results.filter(x => x.isFile);
                    for (let file of files) {
                        if (file.name != "manifest.json") {
                            let server = '*://' + (useAssets ? 'assets.' : '') + 'krunker.io/' + file.fullPath.replace('/crxfs/', '') + '*';
                            swap.filter.urls.push(server);
                            swap.files[server.replace(/\*/g, '')] = chrome.extension.getURL(file.fullPath.replace('/crxfs/', ''));
                        }
                    }
                    if (newDirs.length) searchDir(dir, newDirs);
                });
            }
        });
    }
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
    let redirect = swap.files[details.url.replace(/https|http|(\?.*)|(#.*)/gi, '')] || details.url;
    if (details.url !== redirect) console.debug('Redirecting... ', details.url, 'to', redirect);
    return {
        redirectUrl: redirect
    }
}, {
    urls: swap.filter.urls
}, ['blocking']);