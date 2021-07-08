(function () {
    const myCarousel = new Carousel(document.querySelector("#myCarousel"), {
        // Your options go here
    });

    const leftBtn = $('.offer__contol--left');
    const rightBtn = $('.offer__contol--right');

    rightBtn.on('click', (e) => {
        e.preventDefault();
    })

    leftBtn.on('click', (e) => {
        e.preventDefault();
    })
})()