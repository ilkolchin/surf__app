(function () {

    const toggleActiveClass = () => {
        $('#nav-icon6').toggleClass('open');
        $('.fullscreen-menu').toggleClass('fullscreen-menu--active');
        $('.hero').toggleClass('hero--active');
        $('body').toggleClass('locked');
    }

    $(function () {
        $('#nav-icon6').on('click', function () {
            toggleActiveClass();
        });
    });

    $('.menu--vertical').find('a').on('click', e => {
        e.preventDefault();
        toggleActiveClass();
    });

})()