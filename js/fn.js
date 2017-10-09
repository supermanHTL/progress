	// 轮播图
	var mySwiper1 = new Swiper('.swiper-container1',{
        autoplay : 3000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
        // pagination : 'pagination',
        paginationClickable :true,
        pagination: '.swiper-p1',
        // 该参数默认是true，手一滑动则停止自动滑动
        autoplayDisableOnInteraction : false,
    })
    var mySwiper2 = new Swiper('.swiper-container2',{
        autoplay : 3000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
        paginationClickable :true,
        pagination: '.swiper-p2',
        // 该参数默认是true，手一滑动则停止自动滑动
        autoplayDisableOnInteraction : false,
    })