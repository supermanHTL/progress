$(function() {
    var mySwiper = new Swiper('.swiper-container',{
        autoplay : 3000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
        pagination : 'pagination',
        paginationClickable :true,
        pagination: '.swiper-pagination',
        // 该参数默认是true，手一滑动则停止自动滑动
        autoplayDisableOnInteraction : false,
    })
})