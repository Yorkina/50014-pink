;
ymaps.ready(function() {
    var myMap;
    myMap = new ymaps.Map('footer__map--y', {
            center: [59.938667, 30.323073],
            zoom: [15],
            controls: []
        }),
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myPlacemark = new ymaps.Placemark([59.938667, 30.323073], {
        hintContent: '', // различная инфа при наведении на метку
        balloonContent: ''// различная инфа при нажатии на метку
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../src/img/map-marker.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [0, 0]
    });
    myMap.geoObjects.add(myPlacemark);
});
