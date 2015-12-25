
var _eventUtil = {
	//添加事件
	addHandler:function(ele,type,fun){
		if(ele.addEventListener){
			ele.addEventListener(type,fun,false);
		}else if(ele.attachEvent){
			ele.attachEvent("on"+type,fun);
		}else{
			ele["on"+type]=fun;
		}
	},
	removeHandler : function(ele,type,fun){
		if(ele.removeEventListener){
			ele.removeEventListener(type,fun,false);
		}else if(ele.detachEvent){
			ele.detachEvent("on"+type,fun);
		}else{
			ele["on"+type]=null;
		}		
	},
    getEvent : function(event){
        return event ? event : window.event; 
         
    },
    getTarget : function(event){
        return event.target || event.srcElement;
 
    },
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
 
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    } 
}

var zzc={
		eventUtil : _eventUtil,
		ready : (function () {
		  var ie = !!(window.attachEvent && !window.opera);
		  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
		  var fn = [];
		  var ieIsOk = false;

		  var run = function () {ieIsOk=true; for (var i = 0; i < fn.length; i++) fn[i](); };
		  var d = document;

		  var ready = function (f) {
		    if (!ie && !wk && d.addEventListener)
		      return d.addEventListener('DOMContentLoaded', f, false);
		    if (fn.push(f) > 1) return;
		    if (ie){
		      (function () {
		        try { 
		            d.documentElement.doScroll('left'); run(); 
		        }catch (err) {
		            if (ieIsOk) { 
		                //alert(1);  return;
		            }else{
		                setTimeout(arguments.callee, 0); 
		            }
		        }
		      })();
		    }else if (wk)
		      var t = setInterval(function () {
		        if (/^(loaded|complete)$/.test(d.readyState))
		          clearInterval(t), run();
		      }, 0);
		  };
		  return ready;
		})(),


		getStyle:function(e,name){//获取元素指定样式的值的函数，如我要看这个元素的css属性的color是什么，不一定就要在style里
			if(e.style[name]){//说明在style里找得到
				return e.style[name];
			}else if(e.currentStyle){//IE浏览器可以用私有对象currentStyle读取当前样式的属性值
				return e.currentStyle[name];
			}else if(document.defaultView&&document.defaultView.getComputedStyle){//支持dom标准的浏览器。拿到当前样式的属性值
				name = name.replace(/[A-Z]/g,"-$1")//把形如marginLeft换成margin-left；
				name = name.toLowerCase();//小写
				var s = document.defaultView.getComputedStyle(e,null);//获取当前元素的样式属性对象
				if(s){//如果当前元素的样式属性对象存在
					return s.getPropertyValue(name);
				}
			}else{
				return null;//如果不支持，返回null;
			}			
		},
		//设置透明度
		setOpacity:function(ele,value){
			if(document.all){    //IE 这行出错
				ele.style.filter = "alpha(opacity="+value+")";
				this.setOpacity = function(ele,value){					
					ele.style.filter = "alpha(opacity="+value+")";
				}
			}
			else{
				ele.style.opacity = value/100;
				this.setOpacity = function(ele,value){
					ele.style.opacity = value/100;
				}
			}
		},
		//拿到透明度
		getOpacity:function(ele){
			if(!this.getStyle(ele,"filter")){//ie没设置过，设他一下					
					this.setOpacity(ele,100);
			}
			if(document.all){    //IE				
				this.getOpacity=function(ele){return /[\d\.]+/.exec(this.getStyle(ele,"filter"))[0]}
				return parseInt(/[\d\.]+/.exec(this.getStyle(ele,"filter"))[0]);				
			}
			else{//非IE
				this.getOpacity=function(ele){return parseInt(this.getStyle(ele,"opacity")*100)}
				return parseInt(this.getStyle(ele,"opacity")*100)
			}
		},
		
		//拿到子节点
		getChildNodes:function(ele){
		    var childNodes=[];
		    var i=0;
		    for(var key in ele.childNodes){
		        if(ele.childNodes[key].nodeType==1){
		            childNodes[i]=ele.childNodes[key];
		            i++;
		        }        
		    } 
		    return childNodes   
		},
		moveTo : (function(){
			var tasks = [];
			var gapTime = 20;
			var addNewTask = function(ele){
				for (var i = tasks.length - 1; i >= 0; i--) {
					if(tasks[i].ele==ele){
						break;
					}
				};
				if(i<0){
					var i = tasks.length;
					tasks[i]={
						ele:ele,
						t:0
					}
				}
				return tasks[i];
			}
			return function(ele,sizeInfo,time,callback){
				time = time?time:1000;				
				var task = addNewTask(ele);
				var moveInfo={};
				for(key in sizeInfo){
					var iniV 
					if(isNaN(parseInt(this.getStyle(task.ele,key)))){
						iniV= 0;
					}else{
						iniV=parseFloat(this.getStyle(task.ele,key));
					}
					moveInfo[key+"fnl"] = sizeInfo[key];
					moveInfo[key+"ini"] = iniV;
					moveInfo[key+"offset"] = moveInfo[key+"fnl"]-moveInfo[key+"ini"];
					moveInfo[key+"step"] = moveInfo[key+"offset"]/(time/gapTime);
					moveInfo[key+"hasGo"] = 0;
					moveInfo[key+"ok"] = false;
				}
				clearInterval(task.t); 
				(function(){
					var isAllOk = true;
					for(key in sizeInfo){
						if(!moveInfo[key+"ok"]){
							moveInfo[key+"hasGo"]+=moveInfo[key+"step"];
							if(Math.abs(moveInfo[key+"hasGo"])<Math.abs(moveInfo[key+"offset"])){
								//console.log(moveInfo[key+"hasGo"]+"---"+moveInfo[key+"step"]+"--"+moveInfo[key+"offset"])
								task.ele.style[key]=moveInfo[key+"ini"]+moveInfo[key+"hasGo"]+"px";
							}else{
								moveInfo[key+"ok"] = true;
							}
							isAllOk=isAllOk&&moveInfo[key+"ok"];
						}
					}

					if(isAllOk){
						clearInterval(task.t);
						for(key in sizeInfo){
							task.ele.style[key] = sizeInfo[key]+"px";
						}
						callback&&callback();
					}else{
						task.t = setTimeout(arguments.callee,gapTime);
					}

				})();
			}
		})(),
		fade:(function(){
			var tasks = [];
			var gapTime = 20;
			var addNewTask = function(ele){
				for (var i = tasks.length - 1; i >= 0; i--) {
					if(tasks[i].ele==ele){
						break;
					}
				};
				if(i<0){
					var i = tasks.length;
					tasks[i]={
						ele:ele,
						t:0
					}
				}
				return tasks[i];
			}
			return function(ele,fadeNum,time,callback){
				time = time?time:1000;				
				var task = addNewTask(ele);
				var fadeInfoObj = {};
				fadeInfoObj.ini = this.getOpacity(ele);
				fadeInfoObj.fnl = fadeNum;
				fadeInfoObj.fOffset = fadeNum-this.getOpacity(ele);
				fadeInfoObj.step = fadeNum-this.getOpacity(ele)/(time/gapTime);
				fadeInfoObj.hasGo = 0
				
				
				clearTimeout(task.t); 
				(function(){
					fadeInfoObj.hasGo += fadeInfoObj.step;
					if(Math.abs(fadeInfoObj.hasGo)<Math.abs(fadeInfoObj.fOffset)){
						//div1.innerHTML = fadeInfoObj.ini+fadeInfoObj.hasGo
						zzc.setOpacity(task.ele,fadeInfoObj.ini+fadeInfoObj.hasGo);
						task.t = setTimeout(arguments.callee,gapTime);
					}else{
						clearTimeout(task.t);
						zzc.setOpacity(task.ele,fadeInfoObj.fnl);
					}
				})();
			}
		})()

}
