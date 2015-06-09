ymaps.ready(function() {
    var o;
    o = new ymaps.Map("footer__map--y", {
        center: [59.938554, 30.32248],
        zoom: [15],
        controls: []
    }), o.behaviors.disable("scrollZoom"), o.controls.add("zoomControl"), 
    myPlacemark = new ymaps.Placemark([59.938563, 30.32160], {
        hintContent: "Жмакабельно",
        balloonContent: ""
    }, {
        iconLayout: "default#image",
        iconImageHref: "../src/img/svg/map-marker.svg",
        iconImageSize: [40, 40],
        iconImageOffset: [0, 0]
    }), o.geoObjects.add(myPlacemark)
});
