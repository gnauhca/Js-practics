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


		/*
		 * @param e {node} 元素
		 * @name {string} 样式名
		 */
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
			if(document.all){    
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
		ani : {
			tasks : [],
			isAllOver : true,
			aniT : 0,
			gapTime : 20,
			addNewTask:function(ele,type,callback){
				var tasks = this.tasks;
				for (var i = tasks.length - 1; i >= 0; i--) {
					if(tasks[i].ele==ele&&tasks[i].type==type){
						break;
					}
				};
				if(i<0){
					var i = tasks.length;
					tasks[i]={
						type:type,
						ele:ele
					}
				}
				tasks[i].callback = callback;
				return tasks[i];
			},			
			aniGo : function(){
				this.isAllOver = false;
				var tasks = this.tasks; 
				for (var i = tasks.length - 1; i >= 0; i--) {
					var task = tasks[i];
					if(tasks[i].type=="moveTo"){
						var isAllOk = true;
						for(key in task.sizeInfo){
							if(!task.moveInfo[key+"ok"]){
								task.moveInfo[key+"hasGo"]+=task.moveInfo[key+"step"];
								if(Math.abs(task.moveInfo[key+"hasGo"])<Math.abs(task.moveInfo[key+"offset"])){
									//console.log(task.moveInfo[key+"hasGo"]+"---"+task.moveInfo[key+"step"]+"--"+task.moveInfo[key+"offset"])
									task.ele.style[key]=task.moveInfo[key+"ini"]+task.moveInfo[key+"hasGo"]+"px";
								}else{
									task.moveInfo[key+"ok"] = true;
								}
								isAllOk=isAllOk&&task.moveInfo[key+"ok"];
							}
						}
						if(isAllOk){
							for(key in task.sizeInfo){
								task.ele.style[key] = task.sizeInfo[key]+"px";
							}
							tasks.splice(i,1);
							task.callback&&task.callback();//console.log(task.callback)
						}
					}else{
						task.fadeInfo.hasGo += task.fadeInfo.step;
						if(Math.abs(task.fadeInfo.hasGo)<Math.abs(task.fadeInfo.fOffset)){
							zzc.setOpacity(task.ele,task.fadeInfo.ini+task.fadeInfo.hasGo);
						}else{
							zzc.setOpacity(task.ele,task.fadeInfo.fnl);
							tasks.splice(i,1);
						}
					}
				}
				if(tasks.length!=0){					
					this.aniT = setTimeout(function(){zzc.ani.aniGo();},this.gapTime);
				}else{
					this.isAllOver = true;
					clearTimeout(this.aniT);
				}
				//console.log(this.tasks.length)
			}
		},
		moveTo : function(ele,sizeInfo,time,callback){//console.log(typeof time)
			var time = (typeof time!="undefined")?time:1000;				
			var task = this.ani.addNewTask(ele,"moveTo",callback);
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
				moveInfo[key+"step"] = moveInfo[key+"offset"]/(time/this.ani.gapTime);
				moveInfo[key+"hasGo"] = 0;
				moveInfo[key+"ok"] = false;
			}
			task.moveInfo = moveInfo;
			task.sizeInfo = sizeInfo;//console.log(this.ani.isAllOver)
			this.ani.isAllOver&&this.ani.aniGo();
			//console.log(task.moveInfo)
		},
		fade:function(ele,fadeNum,time,callback){
			time = time?time:1000;				
			var task = this.ani.addNewTask(ele,"fade");
			var fadeInfo = {};
			fadeInfo["ini"] = zzc.getOpacity(ele)
			fadeInfo["fnl"] = fadeNum
			fadeInfo["fOffset"] = fadeInfo["fnl"]-fadeInfo["ini"]
			fadeInfo["step"] = fadeInfo["fOffset"]/(time/this.ani.gapTime);
			fadeInfo["hasGo"] = 0

			task.fadeInfo = fadeInfo;
			this.ani.isAllOver&&this.ani.aniGo();
		}
}
