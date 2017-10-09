(function() {
    $('.sort li').each(function(i) {
        $(this).tap(function() {
            $('.sort li').removeClass('active').eq(i).addClass('active');
            $('.items').hide().eq(i).show();
        })
    });
})();

(function() {
    var arr = [];
    $('.items').each(function() {
        arr.push($(this).find('.list').length);
    })
    $('.sort li span').each(function(i) {
        $(this).html(arr[i]);
    })
})();