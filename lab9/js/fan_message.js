useLocalStorage = true;
window.isOnline = () => this.navigator.onLine;

var comments_storage_LS = [];
var comments_storage_DB = [];

const commentName = document.getElementById('comment-name');
const commentBody = document.getElementById('comment-body');

if (isOnline()) {
    load_comments_LS();
} else {
    load_comments_DB();
}

class Comment {
    constructor(name, body, time) {
        this.name = name;
        this.body = body;
        this.time = time;
    }
}
    
const magic = () => {
    event.preventDefault();
    var comment = new Comment(commentBody.value, commentName.value);

    if (isOnline() && useLocalStorage) {
        comments_storage_LS.push(comment)
        localStorage.setItem("comments", JSON.stringify(comments_storage_LS));

    } else {
        save_comments_DB(comment);
    }

    commentBody.value = '';
    commentName.value = '';
}

const dbConfig = () => {
    var openRequest = indexedDB.open("test", 2);
    openRequest.onupgradeneeded = function(e) {
        console.log('runing onupgradeneed');
        var db = openRequest.result;
        var storage = db.createObjectStore('comments', {keyPath: 'name'});
        storage.createIndex('name', 'name', { unique: false });
        storage.createIndex('body', 'body', { unique: false });
    }
    openRequest.onsuccess = function(event) {
        var db = openRequest.result;
        var transaction = db.transaction('comments', 'readwrite');    
        var storage = transaction.objectStore('comments');
        storage.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            
            if (cursor) {
                comments_storage_DB.push(cursor.value);
                cursor.continue();
            }
        }
    }
    openRequest.onerror = function(e) {
        console.log('Error');
        console.log(e);
    }
}

const save_comments_DB = (comment) =>{
    var openRequest = indexedDB.open("test", 2);
    openRequest.onerror = function(event) {
        alert('error')
    }
    openRequest.onsuccess = function(event) {
        var db = openRequest.result;
        var transaction = db.transaction(['comments'], 'readwrite')
        var storage = transaction.objectStore('comments');
    
        var tryAdd = storage.put(comment);
        tryAdd.onsuccess = function(event) {
            
        }
    }
   }

   function load_comments_DB() {
    var openRequest = indexedDB.open("test", 1);
    openRequest.onerror = function(event) {
        console.log('db not working')
      };
      openRequest.onsuccess = function(event) {
        db = event.target.result;
        var transaction = db.transaction(["comments"]);
        var objectStore = transaction.objectStore("comments");
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                comments_storage_DB.push(cursor.value);
                cursor.continue();
                render_comments_DB()
            }
      };
    }
}

function load_comments_LS()  {
    if (localStorage.getItem('comments')) comments_storage_LS = JSON.parse(localStorage.getItem('comments'));
    render_comments_LS();
}


function render_comments_LS() {
    let commentField = document.getElementById('ss');
    let out = '';
    comments_storage_LS.forEach(function(item){
        out += `<div class="fan-message-container">
            <div class="fan-message-text"><p class="">${item.body}</p></div>
            <p class="fan-message-nickname">${item.name}</p>
            <p class="fan-message-time"></p>
        </div>`;
    });
    commentField.innerHTML = out;
}

function render_comments_DB() {
    let commentField = document.getElementById('ss');
    let out = '';
    comments_storage_DB.forEach(function(item){
        out += `<div class="fan-message-container">
            <div class="fan-message-text"><p class="">${item.body}</p></div>
            <p class="fan-message-nickname">${item.name}</p>
            <p class="fan-message-time"></p>
        </div>`;
    });
    commentField.innerHTML = out;
}

const onOnline = () => {
    alert('Local storage working.')
}


const onOffline = () => {
    alert('Database working.')
}

window.addEventListener('DOMContentLoaded', dbConfig); 
window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);