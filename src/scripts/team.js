(function () {

    const openItem = item => {
        item.closest('.team__item').find('.team__desc').addClass('team__desc--active');
        item.closest('.team__item').find('.triangle').addClass('triangle--active');
    }

    const closeItem = item => {
        item.closest('.team').find('.team__desc').removeClass('team__desc--active');
        item.closest('.team').find('.triangle').removeClass('triangle--active');
    }

    $('.team__member-title').on('click', (e) => {
        const $this = $(e.currentTarget);

        if ($this.next('.team__desc').is('.team__desc--active')) {
            closeItem($this);
        } else {
            closeItem($this);
            openItem($this);
        }

    })

})()