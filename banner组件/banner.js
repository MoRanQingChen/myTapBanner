function Banner(ele,imgs,time,li){
	this.oBanner = document.querySelector(ele);
	this.width=this.oBanner.clientWidth;
	this.imgs=imgs;
	this.height=this.oBanner.clientHeight;
	this.max=imgs.length;
	this.size=li||this.height/20;
	this.time=time;
	this.count=0;
	this.render();
}
Banner.prototype.render=function(){
	this.oBanner.style.overflow="hidden";
	this.oBanner.style.position="relative";
	var str="<div style='width:"+(this.max+2)*this.width+"px;height:"+this.height+"px;margin-left:0'>"
	var str2="<ul style='height:"+this.size+"px;position:absolute;left:50%;top:90%;list-style:none;margin-left:"+-this.max*this.size/2+"px'>"
	for(var i=0;i<this.max+2;i++){
		str+="<img src='"+this.imgs[i%this.max]+"'style='width:"+this.width+"px;height:"+this.height+"px;float:left'></img>";
		if (i<this.max) {
			str2+="<li style='width:"+this.size+"px;height:"+this.size+"px;margin:"+this.size/4+"px;border-radius:"+this.size+"px;background:rgba(255,255,255,.5);float:left'></li>"
		}
	}
	str+="</div>"+str2+"</ul>";
	this.oBanner.innerHTML=str;
	this.point=this.oBanner.getElementsByTagName('li')
	this.point[0].style.background="#fff"
	this.bindEvent.call(this);
	this.interval.call(this);
}
Banner.prototype.changePoint=function(){
	for (var i = 0; i <this.max; i++) {
		this.point[i].style.background="rgba(255,255,255,.5)"
	}
	this.point[Math.abs(this.count)%this.max].style.background="#fff"
}
Banner.prototype.bindEvent=function(){
	var _this=this;
	this.ctrl=this.oBanner.getElementsByTagName('div')[0];
	this.ctrl.addEventListener('touchstart', function(e){
		_this.startMargin = parseFloat(_this.ctrl.style.marginLeft);
		if (_this.startMargin < -_this.max * _this.width) {
			_this.startMargin += _this.max * _this.width;
			_this.count = -1;
		}
		if (_this.startMargin >= 0) {
			_this.startMargin -= _this.max * _this.width;
			_this.count = -_this.max;
		}
		_this.start = e.touches[0].clientX;
	})
	this.oBanner.addEventListener('touchmove', function(e){		
		_this.ctrl.style.marginLeft = e.touches[0].clientX - _this.start + _this.startMargin + 'px';
	})
	this.oBanner.addEventListener('touchend', function(e){
		e.changedTouches[0].clientX - _this.start > 0 ? _this.count++ : e.changedTouches[0].clientX -_this.start == 0 ? 0: _this.count--;
		_this.startMargin = parseFloat(_this.ctrl.style.marginLeft);
		_this.animate(_this.ctrl, _this.startMargin, _this.count * _this.width);
		_this.changePoint.call(_this);
	})
}
Banner.prototype.animate=function(ele, start, target){
	var timer = setInterval(function(){
			Math.abs(target - start) >= this.max * this.width ? (start = target) : target - start > 0 ? start += 80 : target - start < 0 ? start -= 80 : 0; //速度
			ele.style.marginLeft = start + 'px';
			if (start < target + 50 && start > target - 50) {
				ele.style.marginLeft = target + 'px'
				clearInterval(timer)
			}
	}, 20)
}
Banner.prototype.interval=function(){
	var _this=this;
	setInterval(function(){
		_this.count--;
		if(_this.count==-_this.max-2){
			_this.ctrl.style.marginLeft=-_this.width+'px';
			_this.count=-2;
		}
		_this.animate(_this.ctrl,parseFloat(_this.ctrl.style.marginLeft), _this.count * _this.width);
		_this.changePoint.call(_this);
	},this.time||10000)
}