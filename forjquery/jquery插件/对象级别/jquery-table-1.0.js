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
			//实现功能的代码
			//偶数行
			var _this=$(this);
			_this.find('tr:even').addClass(options.evenRowClass);
			//奇数行
			_this.find('tr:odd').addClass(options.oddRowClass);
			/*_this.find('tr').hover(function(){
				$(this).addClass(options.currentRowClass)
			},function(){
				$(this).removeClass(options.currentRowClass)
			})*/
			_this.find('tr').bind(options.eventType,function(){
				$(this).addClass(options.currentRowClass);
			}).bind('mouseout',function(){
				$(this).removeClass(options.currentRowClass)
			})

		});
	};

})(jQuery);
