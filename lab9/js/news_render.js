window.isOnline = () => this.navigator.onLine;

if(isOnline()) {
    load_news_LS()
} else {
    load_news_DB();
}


var news_storage_DB = [];

news_storage_DB = JSON.parse(JSON.stringify(news_storage_DB))


function load_news_LS()  {
    if (localStorage.getItem('news')) news_storage_LS = JSON.parse(localStorage.getItem('news'));
    render_news_LS();
}

function load_news_DB() {
    var openRequest = indexedDB.open("test2", 3);
    openRequest.onerror = function() {
        console.log('db not working')
      };
      openRequest.onsuccess = function(event) {
        db = event.target.result;
        var transaction = db.transaction(["news"]);
        var objectStore = transaction.objectStore("news");
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                news_storage_DB.push(cursor.value);
                cursor.continue();
                render_news_DB()
            }
      };
    }
}


function render_news_LS() {
    let commentField = document.getElementById('aa');
    let out = '';
    news_storage_LS.forEach(function(item){
        out += `<div class="fan-message-container">
            <div class="fan-message-text"><p class="">${item.title}</p></div>
            <p class="fan-message-nickname">${item.text}</p>
            <p class="fan-message-time"></p>
        </div>`;
    });
    commentField.innerHTML = out;
}

function render_news_DB() {
    let commentField = document.getElementById('aa');
    let out = '';
    news_storage_DB.forEach(function(item){
        out += `<div class="fan-message-container">
            <div class="fan-message-text"><p class="">${item.title}</p></div>
            <p class="fan-message-nickname">${item.text}</p>
            <p class="fan-message-time"></p>
        </div>`;
    });
    commentField.innerHTML = out;
}