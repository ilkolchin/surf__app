(function () {

    const measuredWidth = item => {

        let reqItemWidth = 0;
        const screenWidth = $(window).width();
        const container = item.closest('.silder__list');
        const sliderBlocks = container.find('.slider__title');
        const titlesWidth = sliderBlocks.width() * sliderBlocks.length;

        const textContainer = item.closest('.slider__item').find('.slider__desc-text');
        const paddingLeft = parseInt(textContainer.css('padding-left'));
        const paddingRight = parseInt(textContainer.css('padding-right'));

        const isTablet = window.matchMedia('(max-width: 768px)').matches;
        const isMobile = window.matchMedia('(max-width: 480px)').matches;

        if (isMobile) {
            reqItemWidth = screenWidth - sliderBlocks.width();
        } else if (isTablet) {
            reqItemWidth = screenWidth - titlesWidth;
        } else {
            reqItemWidth = 524;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingRight - paddingLeft
        }
    }

    const openItemSlider = item => {
        const descActive = item.closest('.slider__item').find('.slider__desc').addClass('slider__desc--active');
        descActive.width(measuredWidth(item).container);

        item.closest('.slider__item').addClass('slider__item--active');

        const textBlock = item.closest('.slider__item').find('.slider__desc-text');
        textBlock.width(measuredWidth(item).textContainer);
    }

    const closeItemSlider = item => {
        const descActive = item.closest('.slider').find('.slider__desc').removeClass('slider__desc--active');
        descActive.width('0');
        
        item.closest('.slider').find('.slider__item').removeClass('slider__item--active');
    }

    $('.slider__title').on('click', (e) => {
        const $this = $(e.currentTarget);

        if ($this.next('.slider__desc').is('.slider__desc--active')) {
            closeItemSlider($this);
        } else {
            closeItemSlider($this);
            openItemSlider($this);
        }

    })

})()