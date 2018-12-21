window.isOnline = () => this.navigator.onLine;
let news_storage = [];

document.getElementById('send-news').onclick = function() {    
    event.preventDefault()  
    let newsTitle = document.getElementById('news-title');
    let newsText = document.getElementById('news-text');
    let newsImage = document.getElementById('news-image');
    let newsForm = document.getElementById('news-add-form');

    let news = {
        title : newsTitle.value,
        text : newsText.value,
        image : newsImage.value
    }

    function validation() {
      if (newsText.value.length < 0 ) {
          alert('Введіть текст')
      }
      else if (newsTitle.value.length < 0 ) {
          alert('Введіть заголовок')
      }
      else if (newsImage.files.length === 0) {
        alert('Виберіть фото')
      }
      else if (!isOnline()) {
        news_storage.push(news) && saveNews();
        newsForm.reset();
        newsImage.value = "" ;
        
      }
      else (
        console.log('Server connection')
      )    
  }
  validation();
}

const onOnline = () => {
  alert('Server online');
 
}

const onOffline = () => {
  alert('Server offline');
}

function saveNews() {
    localStorage.setItem('news_storage', JSON.stringify(news_storage));
}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('#image-container').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };
  
  $("#news-image").change(function() {
    readURL(this);
  });
  

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  
  

