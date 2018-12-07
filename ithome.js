var dataFlag = 'of';
var bbb;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
setInterval(() => {
    $.get(CORS_PROXY+'https://www.ithome.com/', (data, status) => {
        var parser = new DOMParser();
        var data = parser.parseFromString(data, "text/html");
        var dataHash = data.querySelectorAll('.new-list-1 ul .new')[0].lastChild.textContent;
        var dataHashHref = data.querySelectorAll('.new-list-1 ul .new')[0].lastChild.firstChild.href;
        if (dataFlag != dataHash) {
            console.log(dataHash);
            chrome.notifications.create('ithome', {
                type: "basic",
                iconUrl: 'favicon.ico',
                title: 'IThome',
                message: dataHash,
            });
            chrome.notifications.onClicked.addListener(()=>{
                window.open(dataHashHref);
                chrome.notifications.clear('ithome');
            })
            dataFlag = dataHash;
        }
    }, "html");
}, 10000)

