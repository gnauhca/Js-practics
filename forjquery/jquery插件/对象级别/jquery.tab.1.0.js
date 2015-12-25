;(function($){
	
	$.fn.table=function(options){
		var defaults={//各种参数，属性
			evenRowClass:'evenRow',
			oddRowClass:'oddRow',
			currentRowClass:'currentRow',
			eventType:'mouseover'
		};
		//使用传入参数（也是对象字面量）覆盖defaults里的默认值
		var options = $.extend(defaults,options);

		this.each(function(){
			

		});
	};

})(jQuery);
