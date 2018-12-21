loadNews();

function loadNews() {
  if (localStorage.getItem('news_storage')) news_storage = JSON.parse(localStorage.getItem('news_storage'));
  showNews();
}

function showNews() {
  let newsField = document.getElementById('aa');
  let out = '';
  news_storage.forEach(function(item){
      out += `<div class='news-container'>
          <div class="news-photo"><img src="${item.image}"></div>
          <div class="news-description-text"><p>${item.title}</p></div>
          <div class="news-description-low"><p>${item.text}</p></div>
      </div>`;
  });
  newsField.innerHTML = out;
}