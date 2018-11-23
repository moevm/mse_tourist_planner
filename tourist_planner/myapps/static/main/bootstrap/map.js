var marker = null;
var mark;
function initnewmap() {
    var mymap = L.map('newMapPoint').setView([59.946573, 30.329109], 10);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    mymap.on('click', function (e) {
        if (marker === null)
            onMapClick(e);
        else
            marker.setLatLng(e.latlng);
    });

    function onMapClick(e) {
        marker = new L.marker(e.latlng);
        mymap.addLayer(marker);
    }
}

function initmap(div_id, latlng) {
    var map;
    mark = null;
    console.log(div_id);
    console.log(latlng);
    if((latlng[0] == 0) && (latlng[1]== 0)) {
        console.log(0);
        map = L.map(div_id).setView([59.946573, 30.329109], 10);
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    else {
        console.log(1);
        map = L.map(div_id).setView(latlng, 10);
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
            mark = new L.marker(latlng);
            map.addLayer(mark);
    }
    console.log(map);
    map.on('click', function (e) {
        if (mark === null)
            onMapClick(e);
        else
            mark.setLatLng(e.latlng);
    });

    function onMapClick(e) {
        mark = new L.marker(e.latlng);
        map.addLayer(mark);
    }

}

