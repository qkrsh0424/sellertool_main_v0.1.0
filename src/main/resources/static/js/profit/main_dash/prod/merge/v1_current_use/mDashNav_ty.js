(function() {

    var doc = document.documentElement;
    var w = window;

    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = $('#i_ty_mDash_nav');

    var checkScroll = function() {

        /*
         ** Find the direction of scroll
         ** 0 - initial, 1 - up, 2 - down
         */
        curScroll = w.scrollY || doc.scrollTop;
        // console.log(curScroll)
        if (curScroll > prevScroll && curScroll > 850) {
            //scrolled up
            direction = 2;
        } else if (curScroll < prevScroll && curScroll > 850) {
            //scrolled down
            direction = 1;
        } else if (curScroll < 850) {
            direction = 3;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };

    var toggleHeader = function(direction, curScroll) {
        if (direction === 2 && curScroll > 850) {

            //replace 850 with the height of your header in px
            prevDirection = direction;
            header.removeClass('hide');
        } else if (direction === 1) {
            header.addClass('hide');
            prevDirection = direction;
        } else if (direction === 3 && curScroll < 850) {
            header.removeClass('hide');
            prevDirection = direction;
        }
    };

    window.addEventListener('scroll', checkScroll);

})();