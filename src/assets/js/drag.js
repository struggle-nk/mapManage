
let startDrag = {
	drag:function(bar, target, callback){
		let params = {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false
		};
		let getCss = function(o,key){
			return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
		};
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
		bar.onmousedown = function(event){
			params.flag = true;
			if(!event){
				event = window.event;
				bar.onselectstart = function(){
					return false;
				}  
			}
			let e = event;
			params.currentX = e.clientX;
			params.currentY = e.clientY;

		document.onmouseup = function(){
			params.flag = false;	
			if(getCss(target, "left") !== "auto"){
				params.left = getCss(target, "left");
			}
			if(getCss(target, "top") !== "auto"){
				params.top = getCss(target, "top");
			}
		};
		document.onmousemove = function(event){
			let e = event ? event: window.event;
			if(params.flag){
				let nowX = e.clientX, nowY = e.clientY;
				let disX = nowX - params.currentX, disY = nowY - params.currentY;
				target.style.left = parseInt(params.left) + disX + "px";
				target.style.top = parseInt(params.top) + disY + "px";

				if (typeof callback == "function") {
					callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
				}
				
				if (event.preventDefault) {
					event.preventDefault();
				}
				return false;
			}
		}
	};	
	}
}
export {
	startDrag
}