;(function($){
	
	$.fn.plugin=function(options){
		var defaults={//各种参数，属性
		};
		//使用传入参数（也是对象字面量）覆盖defaults里的默认值
		var options = $.extend(defaults,options);

		this.each(function(){
			//实现功能的代码
		});
	};

})(jQuery);