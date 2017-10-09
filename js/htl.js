$(function() {
	// 返回上一级
	$(function() {
		$('.goback').on("touchend", function(e) {
			history.back();
			e.preventDefault();
		})
		$('.search-back').on("touchend", function(e) {
			history.back();
			e.preventDefault();
		})
	})

	// 返回顶部按钮(当页面浏览超过200时，返回顶部按钮出现否则消失)
	// 滚动条相对于标签容器时
	$('.main').scroll(function() {
	       if($('.main').scrollTop() > 200) {
	           $('.gotop').show();
	        }else {
	           $('.gotop').hide();
	       }
       })
       $('.gotop').tap(function() {
           $('.main').scrollTop(0);
       })
       $('.main').scroll(function() {
	       if($('.main').scrollTop() > 200) {
	           $('.gotop').show();
	        }else {
	           $('.gotop').hide();
	       }
       })
       $('.gotop').tap(function() {
           $('.main').scrollTop(0);
       })
    // 滚动条相对于浏览器时
	$(window).scroll(function() {
		if($(window).scrollTop() > 200) {
			$('.gotop').show();
		}else {
			$('.gotop').hide();
		}
	})
	$('.gotop').tap(function() {
		$(window).scrollTop(0);
	})
	
	// 收索框聚焦的时候，扫一扫功能消失，收索按钮出现
	$('.index-search form div input').focus(function() {
		$('.index-search form div span').hide().next().show();
	})
	// 收索按钮执行功能
	$('.index-search-sub').tap(function() {
		$(this).hide().prev().show();
	})

	// 《个人信息设置》页面
	// 生日日期的选择|
	$(function() {
		var nowTime = new Date(); //获取当前时间
		var year = nowTime.getFullYear();
		// 动态生成2016~1920的年份
		for(var i = 0; i < 97; i++) {
			var optY = "<option>" + year + "</option>";
			$('.per-year').append(optY);
			year--;
		}
		// 对当前块的点击进行监听
		$('.per-birth').tap(function() {
			// 获取选择的是哪一年
			var yearNum = $(".per-year option").eq($(".per-year").attr("selectedIndex")).text();
			$('.per-day').children().remove(); //先清除所有子集
			// 获取选择的是哪一月份
			var monthNum = $(".per-month option").eq($(".per-month").attr("selectedIndex")).text();
			// 月份的判断
			if(monthNum == 1|| monthNum == 3|| monthNum == 5 || monthNum == 7 ||
				monthNum == 8|| monthNum == 10|| monthNum == 12) {
				addDay(31);
			} else if(yearNum % 4 == 0 && monthNum == 2) {
				addDay(29);
			} else if(yearNum % 4 != 0 && monthNum == 2) {
				addDay(28);
			} else {
				addDay(30);
			}
		})
		$('.per-year').tap(function() {
			$('.per-month').children().remove(); //先清除所有子集
			var month = 1;
			for(var i = 0; i < 12; i++) {
			var optM = "<option>" + month + "</option>";
			$('.per-month').append(optM);
			month++;
		}
		})
		// 动态添加天数的函数
		function addDay(time) {
			var day = 1;
			for(var i = 0; i < time; i++) {
					var optD = "<option>" + day + "</option>";
					$('.per-day').append(optD);
					day++;
				}
		}
	})
	$(function() {
		// 表单信息的验证
		// 手机的验证
		$('.per-phone').blur(function() {
			var phoneCon = $('.per-phone').val();
			var phoneTest=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
			if(!phoneTest.test(phoneCon)) {
				$(this).addClass('isFalse');
			} else {
				$(this).removeClass('isFalse');
			}
		});
		// 邮箱的验证
		$('.per-email').blur(function() {
			var emailCon = $('.per-email').val();
			var emailTest=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!emailTest.test(emailCon)) {
				$(this).addClass('isFalse');
			} else {
				$(this).removeClass('isFalse');
			}
		});
	})
	// 海外直供页面
	$(function() {
		// 返回顶部
		 $('.abroad-main').scroll(function() {
        if($('.abroad-main').scrollTop() > 200) {
            $('.gotop').show();
        }else {
            $('.gotop').hide();
        }
        })
        $('.gotop').tap(function() {
            $('.abroad-main').scrollTop(0);
        })
	})

	// 购物车页面——代付款
	$(function() {
		// 判断当前页面代付款的商品有几件
		$('.sort li').eq(0).find('span').text($('.order-all .order-things').length);
		// 当进行订单取消操作的时候也动态判断代付款的件数
		$('.ord-cancel').tap(function() {
			$('.sort li').eq(0).find('span').text($('.order-all .order-things').length);
		})
		
		// 用于判断是否显示全选效果,以及价格计算
		$('.order-Con').tap(function() {
			var ordAdd = 0; //价格的累计
			var lengthG = $(this).find('.things-son').length;
			var lengthC = $(this).find('.order-choosed').length;
			if(lengthC == lengthG) {
				$(this).find(".stroe-c").addClass('store-choosed');
			} else {
				$(this).find(".stroe-c").removeClass('store-choosed');
			}
			for(var i = 0; i < lengthC; i++) {
				ordAdd += parseFloat($(this).find('.order-choosed').eq(i).prev().find('.ord-money').text()) * 
					parseFloat($(this).find('.order-choosed').eq(i).prev().find('.ord-num').find('b').text());	
			}
			$(this).find('.order-acount').children('em').text(ordAdd);
		})
		// 商品的选择并且价格的计算
		$('.ord-choose').tap(function() {
			if($(this).hasClass('order-choosed')) {
				$(this).removeClass('order-choosed');
			} else {
				$(this).addClass('order-choosed');
			}
			var ordAdd = 0; //价格的累计
			var ordNum = $(this).parents('.order-Con').find('.order-choosed').length;
			for(var i = 0; i < ordNum; i++) {
				ordAdd += parseFloat($(this).parents('.order-Con').find('.order-choosed').eq(i).prev().find('.ord-money').text()) * 
				parseFloat($(this).parents('.order-Con').find('.order-choosed').eq(i).prev().find('.ord-num').find('b').text());
			}
			$(this).parents('.order-Con').find('.order-acount').children('em').text(ordAdd)
		})
		// 店铺选中，是一个全选和反选的效果
		$('.stroe-c').tap(function() {
			if($(this).hasClass('store-choosed')) {
				$(this).parents('.order-Con').find('.order-things').find('.ord-choose').removeClass('order-choosed');
			} else {
				$(this).parents('.order-Con').find('.order-things').find('.ord-choose').addClass('order-choosed');			
			}
		})
	})

	// 商品分类（收索）页面
	$(function() {
		$('.search-tit li').tap(function() {
			$(this).addClass('search-select').siblings().removeClass('search-select');
		})
		// 条件排序（包括综合排序、价格排序、筛选排序等）
		// 筛选的模块的进入
		$('.search-nav li').eq(3).tap(function() {
			$('.filter-side').removeClass('filter-side-out').addClass('filter-side-in');
			$('.fil-mask').show().removeClass('fil-mask-out').addClass('fil-mask-in');
			$('.main').css("overflow","hidden");
		})
		// 筛选的模块的退出
		// 公共功能函数
		function com() {
			$('.elip').hide();
			$('.elip2').hide();
			$('.brand-selected').find('strong').text('');
			$('.brand-det').find('span').removeClass('brand-choose');
			$('.fil-pfh').hide().find('em').text('');
			$('.fh').hide().children('em').text('');
			$('.part-selected strong').text('');
		}
		// 退出按钮
		$('.fil-cancel').tap(function() {
			$(this).parent().siblings().find('strong').text('');
			$('.filter-side').removeClass('filter-side-in').addClass('filter-side-out');
			$('.fil-mask').show().removeClass('fil-mask-in').addClass('fil-mask-out');
			setTimeout((function() {$('.fil-mask').hide()}), 400);
			$('.main').css("overflow","auto");
			com();
		})
		// 完成按钮
		$('.fil-complete').tap(function() {
			$(this).parent().siblings().find('strong').text('');
			$('.filter-side').removeClass('filter-side-in').addClass('filter-side-out');
			$('.fil-mask').show().removeClass('fil-mask-in').addClass('fil-mask-out');
			setTimeout((function() {$('.fil-mask').hide()}), 400);
			com();
			$('.main').css("overflow","auto");
		})
		// 主选项的 清除所选项
		$('.fil-clear').tap(function() {
			$(this).prev().find('strong').text('');
			com();
		})

		$('.search-nav li').on("touchend", function(e) {
			$(this).children('span').show().parent().siblings().children('span').hide();
			if($(this).children('span').hasClass('roted')) {
				$(this).children('span').removeClass('roted');
			} else {
				$(this).children('span').addClass('roted');
			}
			e.preventDefault();
		})

		// 分类模块的进入
		for(var i = 0; i < $('.fil-detail div').length; i++) {
			$('.fil-con li').eq(i+1).tap(function() {
				$('.fil-detail').children('div').eq($(this).index()-1).show().addClass('con-in')
				.removeClass('con-out');
			})
		}
		// 分类模块的退出
		// 返回按钮
		$('.part-goback, .price-goback, .brand-goback').tap(function() {
			$(this).parent().parent().removeClass('con-in').addClass('con-out');
		})
		// 选择了商品，后退出
		$('.part-det li').tap(function() {
			$(this).parents('.part-con').removeClass('con-in').addClass('con-out');
			$('.fil-con li').eq(1).children('strong').text($(this).text());
			$('.part-selected strong').text($(this).text());
		})
			// 清除商品
		$('.part-clear').tap(function() {
			$('.part-selected strong').text('');
		})

		// 价格区间
		var minP, maxP; //最低价格和最高价格
		$('.price-det li span').tap(function() {
			minP = $(this).children('em').eq(0).text();
			maxP = $(this).children('em').eq(1).text();
			$('.fh').show();
			$('.price-selected').find('em').eq(0).text(minP);
			$('.price-selected').find('em').eq(1).text(maxP);
		})
		// 价格搜索
		$('.pri-sure').on("touchend", function(e) {
			if($('.min-price').val() != "" && $('.max-price').val() != "" 
				&& $('.min-price').val() <= $('.max-price').val()) {
				minP = $('.min-price').val(); 
				maxP = $('.max-price').val();
				$('.fh').show();
				$('.price-selected').find('em').eq(0).text(minP);
				$('.price-selected').find('em').eq(1).text(maxP);
			}	
			e.preventDefault();
		})

			// 完成按钮的功能
		$('.price-finish').on("touchend", function(e) {
			if(maxP == null || $('.fh').css('display') === 'none') {
				$('.fil-pfh').hide();
			} else {
				$('.fil-pfh').show();
			}
			$('.fil-pfh').children('em').eq(0).text(minP);
			$('.fil-pfh').children('em').eq(1).text(maxP);
			$('.price-con').removeClass('con-in').addClass('con-out');
			//清除输入框的价格
			$('.min-price').val(''); 
			$('.max-price').val('');
			e.preventDefault();
		})
		// 价格区的清除
		$('.price-clear').tap(function() {
			$('.price-selected').children('strong').hide().children('em').text('');
			$('.fil-con li').eq(2).children('strong').text('');
			$('.min-price').val(''); //清除输入框的价格
			$('.max-price').val('');
			minP = null;
			maxP = null;
		})

		// 品牌筛选
		$('.brand-det li').on("touchend", function(e) {
			var brandArr = []; //用来储存选择了的品牌
			// 样式的切换
			if(!$(this).find('span').hasClass('brand-choose')) {
				$(this).find('span').addClass('brand-choose');
			} else {
				$(this).find('span').removeClass('brand-choose');
			}
			// 讲选择的品牌存入数组
			for(var i = 0; i < $('.brand-choose').length; i++) {
				brandArr.push($('.brand-choose').eq(i).prev().text());
			}
			// 当选择的品牌超出两个则改变样式
			if(brandArr.length > 2) {
				$('.elip2').show().children('i').text(brandArr.length);
				$('.brand-selected').children('strong').text(brandArr[0]);
			} else {
				$('.brand-selected').children('strong').text(brandArr);
				$('.elip2').hide();
			}
			// 当没有选择品牌的时候，清空已经选择的内容
			if($('.brand-choose').length == 0) {
				$('.brand-selected').children('strong').text('');
			}
			e.preventDefault();
			// 完成按钮
			$('.brand-finish').on("touchend", function(e) {	
				$('.fil-con li').eq(3).children('strong').text($('.brand-selected strong').text());
				$('.brand-con').removeClass('con-in').addClass('con-out');
				if(brandArr.length > 2 && $('.brand-choose').length >= 1) {
					$('.elip').show().children('i').text(brandArr.length);
				} else {
					$('.elip').hide();
				}
			})

			// 品牌清空
			$('.brand-clear').tap(function() {
				$('.brand-det').find('span').removeClass('brand-choose');
				$('.brand-selected').children('strong').text('');
				// $('.elip').hide().next().text('');
				$('.elip2').hide();
				brandArr.length = 0;
			})

		})
		

	})
})