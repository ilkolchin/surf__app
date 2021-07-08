(function () {

  let myMap;

  const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.75195670, 37.60141522],
      zoom: 14,
      controls: []
    });

    const myPlacemark = new ymaps.Placemark([55.74977346, 37.60390431], {}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.png',
      iconImageSize: [58, 73],
      iconImageOffset: [-29,-73]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  }

  ymaps.ready(init);

})()