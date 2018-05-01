(function () {
  var lsk = {
    /*吸顶轮子效果
    str 传选择器，最好是ID*/
    scroll: function (str) {
      var oDom = document.querySelector(str);
      var getAllTop = getAllTop(oDom);
      function getAllTop(oDom) {
        var strTop = oDom.offsetTop;
        while (oDom = oDom.offetParent) {
          strTop += oDom.offsetTop
        }
        return strTop
      }
      window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= getAllTop) {
          oDom.style.position = "fixed";
          oDom.style.marginTop = 0;
        } else {
          oDom.style.position = "relative";
          oDom.style.marginTop = getAllTop + 'px'
        }
      }
    },
      /**
      id 返回顶部元素的id字符串，默认值为#backtotop
      scrolltop 滑动多少px时显示返回顶部，默认为500
      target 目标值，默认为0，回到顶部
      animatetime 动画时间，默认为1000
      */
    backtotop: function (id, scrolltop, target, animatetime) {
      id         = id || '#backtotop';
      scrolltop  = scrolltop || 500;
      target     = target || 0;
      animatetime = animatetime || 1000;
      var oBack = document.querySelector(id);
      window.onscroll = function(){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > scrolltop) {
          oBack.style.display = 'block';
        } else {
          oBack.style.display = 'none';
        }
      }

      oBack.onclick = function() {
        scrollAnimate(target, animatetime);
      }

      function scrollAnimate(target, time) {
        if (navigator.userAgent.indexOf('MSIE') != -1) {
          var interval = 50;
        } else {
          var interval = 20;
        }
        var frame = 0;
        var frames = time / interval;
        var start = document.body.scrollTop || document.documentElement.scrollTop;
        var distance = target - start;
        var timer;
        clearInterval(timer);
        timer = setInterval(function(){
          frame++;
          if (frame >= frames) {
            clearInterval(timer);
          }
          //第一个参数t表示当前帧
          //第二个b表示起始位置
          //第三个c表示变化量
          //第四个d表示总帧数
          document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
        }, interval);

        function CubicEaseInOut(t,b,c,d){
          if ((t/=d/2) < 1) return c/2*t*t*t + b;
          return c/2*((t-=2)*t*t + 2) + b;
        }
      }
    },
    zoom: function (bigImgPath) {
      var oSmallPic = document.querySelector('#smallPic');
      var oBigPic = document.querySelector('#bigPic');
      var oZoom = document.querySelector('#zoom');
      oBigPic.style.backgroundImage = 'url(' + bigImgPath + ')';
      oBigPic.style.backgroundRepeat = 'no-repeat';

      //大图800*800 大图盒子 400*400
      //小图盒子350*350 放大镜175*175
      //所以放大镜总行程是350-175 = 175,  大图的总行程 800 - 400 = 400
      // var rate = 400 / 175;//可以用这句话代替下面的四行，下面四行是更通用的代码
      var bigPicWidth = parseFloat(fetchComputedStyle(oBigPic, 'width'));
      var smallPicWidth = parseFloat(fetchComputedStyle(oSmallPic, 'width'));
      var zoomWidth = parseFloat(fetchComputedStyle(oZoom, 'width'));
      var rate = (800 - bigPicWidth) / (smallPicWidth - zoomWidth) ;

      oSmallPic.onmouseover = function() {
        oZoom.style.display = 'block';
        oBigPic.style.display = 'block';
      }
      oSmallPic.onmouseout = function () {
        oZoom.style.display = 'none';
        oBigPic.style.display = 'none';
      }

      oSmallPic.onmousemove = function(event) {
        event = event || window.event;

        //event.offsetX不能用
        //因为onmousemove事件冒泡，鼠标碰到zoom这个放大镜时事件将往上传播
        //会触发oSmallPic的onmousemove事件。因此event.offsetX的坐标，以zoom左上角为准
        // var x = event.offsetX;
        // var y = event.offsetY;

        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        var x = event.clientX - (getAllLeft(oSmallPic) - scrollLeft) - oZoom.clientWidth / 2;
        var y = event.clientY - (getAllTop(oSmallPic) - scrollTop) - oZoom.clientHeight / 2;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > oSmallPic.clientWidth - oZoom.clientWidth) {
          x = oSmallPic.clientWidth - oZoom.clientWidth;
        }
        if (y > oSmallPic.clientHeight - oZoom.clientHeight) {
          y = oSmallPic.clientHeight - oZoom.clientHeight;
        }

        oZoom.style.top = y + 'px';
        oZoom.style.left = x + 'px';

        oBigPic.style.backgroundPosition = -x * rate + 'px ' + -y * rate + 'px';
      }
      function fetchComputedStyle(obj, property) {
        if (window.getComputedStyle) {
          property = property.replace(/[A-Z]/g, function(match){
            return '-' + match.toLowerCase();
          });
          return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
        } else {
          property = property.replace(/-([a-z])/g, function(match, $1){
            return $1.toUpperCase();
          });
          return obj.currentStyle[property];
        }
      }
      function getAllTop(obj) {
        var allTop = obj.offsetTop;
        var currentObj = obj;
        while (currentObj = currentObj.offsetParent) {
          allTop += currentObj.offsetTop;
        }
        return allTop;
      }
      function getAllLeft(obj) {
        var allLeft = obj.offsetLeft;
        var currentObj = obj;
        while(currentObj = currentObj.offsetParent) {
          allLeft += currentObj.offsetLeft;
        }
        return allLeft;
      }

    }

  }
  window.lsk = lsk
})()

//面向对象轮子
/*
面向对象吸顶效果
*/
function Scroll(str) {
  this.str = document.querySelector(str)
  this.A()
}
(function() {
Scroll.prototype = {
    A: function () {
    console.log(this);
    var C = this.str
    var B = getAllTop(this.str)
    console.log(this);
    document.onscroll = function (self) {
    var P =
        document.documentElement.scrollTop ||
        document.body.scrollTop
        if (B <= P) {
          C.style.position = 'fixed'
          C.style.marginTop = 0
        } else {
          C.style.position = 'relative'
          C.style.marginTop = B + 'px'
        }
    }
    function getAllTop(str) {
      var strTop = str.offsetTop
      while (str = str.offsetParent) {
        strTop += str.offsetParent
      }
      return strTop;
    }
  }
}
}());
//返回顶部面向对象
function BackToTop(selector) {
  this.dom = null;
  this.selector = selector;
  this.init();
  this.bindEvent();
  this.bindScrollEvent();
}
BackToTop.prototype.init = function() {
  this.dom = document.querySelector(this.selector);
}
BackToTop.prototype.bindScrollEvent = function() {
  var self = this;
  window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 500) {
    self.dom.style.display = 'block';
    } else {
    self.dom.style.display = 'none';
    }
  }
}
BackToTop.prototype.bindEvent = function() {
   this.dom.onclick = function() {
    scrollAnimate(0, 1000);
  }

  function scrollAnimate(target, timer) {
    var interval = 20;
    var frame = 0;
    var frames = timer / interval;
    var start = document.body.scrollTop || document.documentElement.scrollTop;
    var distance = target - start;
    var timer;
    clearInterval(timer);
    timer = setInterval(function(){
    frame++;
    if (frame >= frames) {
      clearInterval(timer);
    }
    //第一个参数t表示当前帧
    //第二个b表示起始位置
    //第三个c表示变化量
    //第四个d表示总帧数
    document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
    }, interval);

    function CubicEaseInOut(t,b,c,d){
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    }
  }
}
/*面向对象放大镜*/

function Zoom(smallPicSelector, bigPicSelector, zoomSelector, bigImgPath) {
  this.oSmallPic = document.querySelector(smallPicSelector);
  this.oBigPic = document.querySelector(bigPicSelector);
  this.oZoom = document.querySelector(zoomSelector);
  this.oBigPic.style.backgroundImage = 'url(' + bigImgPath + ')';
  this.oBigPic.style.backgroundRepeat = 'no-repeat';

  //大图800*800 大图盒子 400*400
  //小图盒子350*350 放大镜175*175
  //所以放大镜总行程是350-175 = 175,  大图的总行程 800 - 400 = 400
  // var rate = 400 / 175;//可以用这句话代替下面的四行，下面四行是更通用的代码
  this.bigPicWidth = parseFloat(this.fetchComputedStyle(this.oBigPic, 'width'));
  this.smallPicWidth = parseFloat(this.fetchComputedStyle(this.oSmallPic, 'width'));
  this.zoomWidth = parseFloat(this.fetchComputedStyle(this.oZoom, 'width'));
  this.rate = (800 - this.bigPicWidth) / (this.smallPicWidth - this.zoomWidth) ;
	this.bindMouseEvent();

  }
  Zoom.prototype.fetchComputedStyle = function (obj, property) {
    if (window.getComputedStyle) {
      property = property.replace(/[A-Z]/g, function(match){
        return '-' + match.toLowerCase();
      });
      return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
    } else {
      property = property.replace(/-([a-z])/g, function(match, $1){
        return $1.toUpperCase();
      });
      return obj.currentStyle[property];
    }
  }
  Zoom.prototype.getAllTop = function(obj) {
    var allTop = obj.offsetTop;
    var currentObj = obj;
    while (currentObj = currentObj.offsetParent) {
      allTop += currentObj.offsetTop;
    }
    return allTop;
  }
  Zoom.prototype.getAllLeft = function(obj) {
    var allLeft = obj.offsetLeft;
    var currentObj = obj;
    while(currentObj = currentObj.offsetParent) {
      allLeft += currentObj.offsetLeft;
    }
    return allLeft;
  }
  Zoom.prototype.bindMouseEvent = function(){
	 var self = this;
	this.oSmallPic.onmouseover = function() {
		self.oZoom.style.display = 'block';
		self.oBigPic.style.display = 'block';
	  }
	  this.oSmallPic.onmouseout = function () {
		self.oZoom.style.display = 'none';
		self.oBigPic.style.display = 'none';
	  }

	this.oSmallPic.onmousemove = function(event) {
		event = event || window.event;

		//event.offsetX不能用
		//因为onmousemove事件冒泡，鼠标碰到zoom这个放大镜时事件将往上传播
		//会触发oSmallPic的onmousemove事件。因此event.offsetX的坐标，以zoom左上角为准
		// var x = event.offsetX;
		// var y = event.offsetY;
		var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		var x = event.clientX - (self.getAllLeft(self.oSmallPic) - scrollLeft) - self.oZoom.clientWidth / 2;
		var y = event.clientY - (self.getAllTop(self.oSmallPic) - scrollTop) - self.oZoom.clientHeight / 2;
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x > self.oSmallPic.clientWidth - self.oZoom.clientWidth) {
		  x = self.oSmallPic.clientWidth - self.oZoom.clientWidth;
		}
		if (y > self.oSmallPic.clientHeight - self.oZoom.clientHeight) {
		  y = self.oSmallPic.clientHeight - self.oZoom.clientHeight;
		}

		self.oZoom.style.top = y + 'px';
		self.oZoom.style.left = x + 'px';

		self.oBigPic.style.backgroundPosition = -x * self.rate + 'px ' + -y * self.rate + 'px';
	}
  }
/*面向对象选项卡
一定注意选项卡布局为
  eg：div#box
        div#tab_hd
          span元素
          ...
        div#tab_bd
          div元素
          ...
*/

function Tab(hdSelector, bdSelector) {
	this.oSpans = document.querySelector(hdSelector).getElementsByTagName('span');
	//得到body部分的所有div
	this.oDivs = document.querySelector(bdSelector).getElementsByTagName('div');
	this.bindEvent();
}
Tab.prototype.bindEvent = function() {
	//循环批量绑定事件
	var self = this;
	for (var i = 0; i < self.oSpans.length; i++) {
	  //IIFE将外部的i传递到内部的i
	  (function(i){
		//绑定鼠标移入事件
		self.oSpans[i].onmouseover = function () {
		  //排他模型，让所有的div隐藏，让当前对应的div显示
		  for (var j = 0; j < self.oDivs.length; j++) {
			self.oDivs[j].className = '';//将class属性的值设置为空
		  }
		  //当前的i对应的div显示
		  self.oDivs[i].className = 'current';
		  //把所有的span元素的class样式设置为空
		  for (j = 0; j < self.oSpans.length; j++) {
			self.oSpans[j].className = '';
		  }
		  //给最后一个span元素的 class名称设置为last
		  self.oSpans[self.oSpans.length - 1].className = 'last';
		  //给当前的span元素的类名 +是一个空格 current类名, 因为最后一个span默认有一个class为last, 添加后的为 last current。其他元素添加类名之后他的类名是 " current"
		  this.className += ' current'; //class的类名
		}
	  })(i);
	}
}

/*面向对象轮播图*/
function Carousel(selector) {
	this.index = 0;
	this.oRightBtn = document.querySelector(selector).querySelector('.carousel_rightBtn');
	this.oLeftBtn = document.querySelector(selector).querySelector('.carousel_leftBtn');
	this.oImagesLists = document.querySelector(selector).querySelector('.imagesList').getElementsByTagName('li');
	this.oCirclesLists = document.querySelector(selector).querySelector('.circles').getElementsByTagName('li');
	this.bindEvent();
}
Carousel.prototype.bindEvent = function() {
	var self = this;
	self.oRightBtn.onclick = function(){
	  self.index++;
	  if (self.index >= self.oImagesLists.length) {
		self.index = 0;
	  }
	  self.move();
	}
	self.oLeftBtn.onclick = function(){
	  self.index--;
	  if (self.index < 0) {
		self.index = self.oImagesLists.length-1;
	  }
	  self.move();
	}

	for (var i = 0; i < self.oCirclesLists.length; i++) {
	  (function(i){
		self.oCirclesLists[i].onmouseover = function() {
		  self.index = i;
		  self.move();
		}
	  })(i);
	}
}
Carousel.prototype.move = function() {
  for (var i = 0; i < this.oImagesLists.length; i++) {
    this.oImagesLists[i].className = '';
  }
  this.oImagesLists[this.index].className = 'current';

  for (var i = 0; i < this.oCirclesLists.length; i++) {
    this.oCirclesLists[i].className = '';
  }
  this.oCirclesLists[this.index].className = 'current';
}
