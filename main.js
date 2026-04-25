var layout; 
var mapInstance; 

document.addEventListener("DOMContentLoaded", function () {
    mostrarMapa();
});

function mostrarMapa() {

    var data = [{
        type: "scattermapbox",
        mode: "markers",
        lat: [],
        lon: []
    }];

    layout = {
        mapbox: {
            style: "open-street-map",
            center: { lat: 4.7110, lon: -74.0721 },
            zoom: 12
        },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    };

    Plotly.newPlot("Mapa", data, layout).then(function (gd) {

        mapInstance = gd._fullLayout.mapbox._subplot.map;

        activarClick(); 
    });
}


function activarClick() {

    if (!mapInstance) return;

    mapInstance.off('click');

    mapInstance.on('click', function (e) {

        var lat = e.lngLat.lat;
        var lon = e.lngLat.lng;

        Plotly.addTraces("Mapa", {
            type: "scattermapbox",
            mode: "markers",
            lat: [lat],
            lon: [lon],
            marker: {
                size: 12,
                color: colorRandom()
            }
        });

        console.log("Lat:", lat, "Lon:", lon);
    });
}

function colorRandom() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}


function borrarPuntos() {

    Plotly.react("Mapa", [{
        type: "scattermapbox",
        mode: "markers",
        lat: [],
        lon: []
    }], layout).then(function (gd) {

   
        mapInstance = gd._fullLayout.mapbox._subplot.map;

        activarClick(); 
    });
}