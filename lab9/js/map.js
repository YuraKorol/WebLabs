function initMap() {
    var naviOffice = {
        lat: 50.40490436,
        lng: 30.52515898 
    }
        var map = new google.maps.Map(document.getElementById('map'), {
        center: naviOffice,
        zoom: 15
    });
    var marker = new google.maps.Marker({ 
    position:  naviOffice,
    map: map
});
  }