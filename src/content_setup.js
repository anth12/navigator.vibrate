var s = document.createElement("script");
s.src = chrome.extension.getURL("content.js");
(document.head||document.documentElement).appendChild(s);