jQuery(document).ready(function ($) {
    $('.contact-tab-list .item').click(function () {
        $('.contact-tab-list .item').removeClass('active');
        $(this).addClass('active');
    });
});
var marker;
var map;
$("#location-1").click(function () {
    changeMarkerPos(21.022048, 105.854375);
});
$("#location-2").click(function () {
    changeMarkerPos(10.778146, 106.701893);
});
$("#location-3").click(function () {
    changeMarkerPos(10.213921, 103.963267);
});
function initialize() {
    var styles = [
        {
            featureType: 'road',
            elementType: 'all',
            stylers: [
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#adc9b8' }
            ]
        }, {
            featureType: 'landscape.natural',
            elementType: 'all',
            stylers: [
                { hue: '#809f80' },
                { lightness: -35 }
            ]
        }
    ];
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });
    var mapProp = {
        center: new google.maps.LatLng(21.022048, 105.854375),
        zoom: 17,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style')

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(21.022048, 105.854375),
        animation: google.maps.Animation.DROP,
        draggable: false,
        icon: './assets/images/base/default-marker.png'
    });

    marker.setMap(map);
    map.panTo(marker.position);
}

function changeMarkerPos(lat, lon) {
    myLatLng = new google.maps.LatLng(lat, lon)
    marker.setPosition(myLatLng);
    map.panTo(myLatLng);
}

google.maps.event.addDomListener(window, 'load', initialize);