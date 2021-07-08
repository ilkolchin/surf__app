(function () {

    const sections = $('section');
    const display = $('.maincontent');
    const sideMenu = $('.fixed-menu');
    const menuItem = sideMenu.find('.fixed-menu__item');
    const isTablet = window.matchMedia('(max-width: 768px)').matches;



    let inScroll = false;


    sections.first().addClass('active');

    const countSectionPosition = sectionEq => {
        return sectionEq * -100;
    }

    const changeMenuThemeForSection = sectionEq => {
        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr('data-sidemenu-theme');
        const activeClass = 'fixed-menu--black';

        if (menuTheme === 'black') {
            sideMenu.addClass(activeClass)
        } else {
            sideMenu.removeClass(activeClass)
        }
    }

    const resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    }

    const performTransition = sectionEq => {

        if (inScroll) return;

        inScroll = true;

        const transformTime = 450;
        const beautifyTiming = 100;

        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        resetActiveClassForItem(sections, sectionEq, 'active');

        setTimeout(() => {
            inScroll = false;
            resetActiveClassForItem(menuItem, sectionEq, 'fixed-menu__item--active')
        }, transformTime - beautifyTiming);

    }

    const viewportScroller = () => {
        const activeSection = sections.filter('.active');
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        if ($('body').hasClass('locked') || ($('html').hasClass('with-fancybox'))) return;

        return {
            next() {
                if (nextSection.length) {
                    performTransition(nextSection.index())
                }
            },

            prev() {
                if (prevSection.length) {
                    performTransition(prevSection.index())
                }
            }
        }
    }

    $(window).on('wheel', e => {
        const deltaY = e.originalEvent.deltaY;
        const scroller = viewportScroller();

        if (deltaY > 0) {
            scroller.next();
        }

        if (deltaY < 0) {
            scroller.prev();
        }
    })

    $(window).on('keydown', e => {

        const tagName = e.target.tagName.toLowerCase();
        const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
        const scroller = viewportScroller();

        if (userTypingInInputs) return;

        switch (e.keyCode) {
            case 38:
                scroller.prev()
                break;

            case 40:
                scroller.next()
                break;
        }

    })

    $('[data-scroll-to]').on('click', e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr('data-scroll-to');
        const reqSection = $(`[data-section-id=${target}]`)

        performTransition(reqSection.index());
    })

    if (isTablet) {
        $("body").swipe({
            swipe: function (
                event,
                direction,
            ) {
                const scroller = viewportScroller();
                let scrollDirection = '';
    
                if (direction === 'up') scrollDirection = 'next';
                if (direction === 'down') scrollDirection = 'prev';
                if(direction !== 'up' && direction !== 'down') return;
    
                scroller[scrollDirection]();
            },
        })
    }
    
    

})()