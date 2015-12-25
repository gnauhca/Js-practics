//1、直接给jquery添加全局函数
jQuery.myAlert=function(str){
	alert(str)
};
//2、extent方法
//jQuery.extend(...) : 静态 $.fangfa()
//jQuery.prototype.extend(...) : $().fangfa();
jQuery.prototype.extend({
	extendFunction:function(){
		alert("extendfunction1");
	},	
	extendFunction2:function(){
		alert("extendfunction2");
	},
	});
//3、使用命名空间
jQuery.zzc={
	myAlert:function(){
				alert('zzc 命名空间的 function')
	}
}