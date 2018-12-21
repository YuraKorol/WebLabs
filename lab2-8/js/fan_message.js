window.isOnline = () => this.navigator.onLine;

let comments = [];

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');
    
    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }
    function validation() {
        if (commentName.value === '') {
            alert('Введіть ім`я')
        }
        else if (commentBody.value === '') {
            alert('Введіть текст')
        }
        else if (!isOnline()) {
            comments.push(comment) 
            localStorage.setItem('comments', JSON.stringify(comments));
        }
        else (
            console.log('Server connection')
        )
    }
    
    validation();
    showComments();
}

const onOnline = () => {
    alert('Server online');
    loadComments();
    showComments();
    
  }

const onOffline = () => {
    alert('Server offline');
    
  }

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){ 
    let commentField = document.getElementById('ss');
    let out = '';
    comments.forEach(function(item){
        out += `<div class="fan-message-container">
            <div class="fan-message-text"><p class="">${item.body}</p></div>
            <p class="fan-message-nickname">${item.name}</p>
            <p class="fan-message-time">${timeConverter(item.time)}</p>
        </div>`;
    });
    commentField.innerHTML = out;
}



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);


