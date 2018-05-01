//吸顶组件
// var scroll = new Scroll('#main-nav')
//判断是否登录,登录则显示用户学号
if(window.localStorage.token){
	$(".nologin").css("display","none");
	$(".info").css("display","block");
	var useInfo = `<a href="javascript:;">${window.localStorage.userId}</a>`;
	$(".info li").eq(0).html(useInfo);
	//显示商品数量
	showLength()
}

//退出登录则还原并清空本地存储
$(".exit").click(function(){
	alert("即将退出当前账号")
	$(".nologin").css("display","block");
	$(".info").css("display","none");
	//清空本地存储
	window.localStorage.clear();
})


function showLength(){
	$.ajax({
		type:"get",
		url:"http://localhost:3000/users/cartList?userId="+window.localStorage.userId,
		success: function(response) {
			response =JSON.parse(response).result.cartList;
			console.log(response);
			var html = `(<em>${response.length}</em>)`;
			$("#cart_num").html(html)
			$("#cart_num em").css("color","red")
		}
	})
}
//请求分类名称
$.ajax({
	type: "get",
	url: "http://localhost:3000/cats",
	success: function(response) {
		response =JSON.parse(response).data;
//		console.log(response);
		var html="";
		for(let i = 0; i < response.length; i++) {
			html+=`
				<li class='listBtn' cat_id=${response[i].cat_id}><span>${response[i].cat_name}</span></li>
			`
		}
		$(".Ul").append(html);
		$(".listBtn").click(function(e){
			e.preventDefault();
   			var catId=$(this).attr("cat_id");
   			getCartGoods(catId);
		})
	}
});

//分类商品请求函数
function getCartGoods(catId){
	$.ajax({
		type: "get",
		url: "http://localhost:3000/goods/cat_goods?cat_id="+catId,
		success: function(response) {
			response =JSON.parse(response).data;
//			console.log(response);
			var html="";
			for(let i = 0; i < response.length; i++) {
				html+=`
						<li>
	                        <div class="pic">
	                            <a href="#"><img src="../img/product/${response[i].good_image}" alt=""></a>
	                        </div>
	                        <div class="main">
	                            <div class="name">${response[i].goods_name}</div>
	                            <div class="decse">${response[i].goods_desc}</div>
	                            <div class="price">￥ ${response[i].goods_price}</div>
	                            <div class="btn-area">
	                                <a href="javascript:;" class="btn btn--m" goods_id=${response[i].goods_id}><span>加入购物车</span></a>
	                            </div>
	                        </div>
	                    </li>
					`
			}
			$(".goods_list").html(html);
			$(".btn").click(function(e){
				e.preventDefault();
	   			var goodsId=$(this).attr("goods_id");
				//调用加入购物车函数
				addCart(window.localStorage.userId,goodsId);
				showLength();
			})
		}
		
	});
}


//商品列表函数
$.ajax({
	type: "get",
	url: "http://localhost:3000/goods",
	success: function(response) {
		response =JSON.parse(response).data;
//		console.log(response);
		var html="";
		for(let i = 0; i < response.length; i++) {
			html+=`
					<li>
                        <div class="pic">
                            <a href="#"><img src="../img/product/${response[i].good_image}" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">${response[i].goods_name}</div>
                            <div class="decse">${response[i].goods_desc}</div>
                            <div class="price">￥ ${response[i].goods_price}</div>
                            <div class="btn-area">
                                <a href="javascript:;" class="btn btn--m" goods_id=${response[i].goods_id}><span>加入购物车</span></a>
                            </div>
                        </div>
                    </li>
				`
		}
		$(".goods_list").html(html);
		$(".btn").click(function(e){
			e.preventDefault();
   			var goodsId=$(this).attr("goods_id");
			
			//调用加入购物车函数
			addCart(window.localStorage.userId,goodsId);
			showLength();
		})
	}
});

//加入购物车
function addCart(userId,goods_id){
	var msg = "";
	$.ajax({
		type:"post",
		url:"http://localhost:3000/users/addCart",
		data:{
			"userId":userId,
			"goods_id":goods_id
		},
		success:function(response){
			response = JSON.parse(response)
//			console.log(response)
			msg = response.result;
			alert(msg)
		}
	})
	
}
//定时器调用时间函数
setInterval(getTime,1000);

//时间函数
function getTime(){
	var hour = new Date().getHours();
	var min = new Date().getMinutes();
	var sec = new Date().getSeconds();
	var time = `
		<li>
			<p class="time">${hour}</p>
			<p> —— </p>
			<p>HOUR</p>
		</li>
		<li>
			<p class="time">${min}</p>
			<p> —— </p>
			<p>MIN</p>
		</li>
		<li>
			<p class="time">${sec}</p>
			<p> —— </p>
			<p>SEC</p>
		</li>
	`;
	$(".clockUl").html(time);
}

$(".nologin li").eq(0).click(function(){
	console.log("弹出登录窗口")
	$(".login").css("display","block");
	$(".zhezhao").css("display","block");	
})
$(".close").click(function(){
	console.log("关闭登录窗口")
	$(".login").css("display","none");
	$(".zhezhao").css("display","none");
	return false;//阻止冒泡事件
})


$(".nologin li").eq(2).click(function(){
	console.log("弹出注册窗口")
	$(".register").css("display","block");
	$(".zhezhao").css("display","block");	
})
$(".closeRegister").click(function(){
	console.log("关闭注册窗口")
	$(".register").css("display","none");
	$(".zhezhao").css("display","none");
	return false;//阻止冒泡事件
})

//注册窗口 检测学号是否存在
$(".usernameRegister").blur(function(){
	console.log("检测学号是否可用");
	var userId = $(".usernameRegister").val();
//	console.log(userId)
	$.ajax({
		type: "post",
		url:"http://localhost:3000/users/registerTest",
		data:{"userId":userId},
		success: function(response) {
			response =JSON.parse(response);
			$("#testResult").css("display","");
			var testResult = `${response.msg}`;
			$("#testResult").html(testResult);
			if(response.msg == "该学号可用"){
				$("#testResult").css("color","green");
			}else{
				$("#testResult").css("color","red");
			}
		}
		
	});
})



//验证密码，增加难易度检测。
$('.first').blur(function(){
	var password=$(this).val();
	if(password.length<6||password.length>20){
		alert("密码要在6-20位以内，请重新输入");
	}else if(password.length>=6&&password.length<8){
		$("#green").css({background:"none"})
  	 	$("#blue").css({background:"none"})
	}else if(password.length>=8&&password.length<12){
	 	$("#green").css({background:"green"})
	}else if(password.length>=12){
	 	$("#green").css({background:"green"})		
	 	$("#blue").css({background:"blue"})
	}
//	var tar= /\$/;
//	var a = tar.test(password);
})
var passwordFlag = false;
$('.second').blur(function(){
	var password1=$(".first").val();
	var password2=$(this).val();
//	console.log(password1,password2)
	if(password1 !== password2){
		$("#testpassword").html("两次密码不一样")
	}else{
		$("#testpassword").html("")
		passwordFlag = true;
	}
})

//验证码
var icode=false;
$.idcode.setCode();//加载生成验证码方法
$("#Txtidcode").change(function() {
    var r = $.idcode.validateCode();//调用返回值，返回值结果为true或者false 
    if (r == true) {
        icode=true;
    } else {
        icode=false;
    }
})
//验证码提示
$(".icode").blur(function(){
//	console.log(icode)
	if(icode){
		$(".error1").html("")
	}else{
		$(".error1").html("验证码错误")
	}
})



//注册
$("#register").click(function(){
	console.log("准备注册");
	var userId = $(".usernameRegister").val();
	var password = $(".first").val();
//	console.log(userId,password)
	if(icode && passwordFlag){
		console.log("密码一致且验证码正确");
		register(userId,password);
	}else{
		console.log("密码或验证码不正确");
	}

	
	
})

//注册函数
function register(userId,password){
	$.ajax({
		type: "post",
		url: "http://localhost:3000/users/register",
		data:{
			"userId":userId,
			"password":password
		},
		success: function(response) {
			response =JSON.parse(response);
			if(response.msg =="注册成功！"){
				alert(response.msg + "去登录吧！");
				$(".register").css("display","none");
				$(".login").css("display","block");
			}
		}
	});
}

$("#login").click(function(){
	login();
})
//登录函数
function login(){
	var username = $(".username").val();
	var password = $(".password").val();

	$.ajax({
		type: "post",
		url: "http://localhost:3000/users/login",
		data:{
			"userId":username,
			"password":password
		},
		success: function(response) {
			response =JSON.parse(response);
			//显示登录结果信息
			if(response.message == '登录成功!'){
				$("#msg").css("color","green");
				
				//延时3s关闭登录窗口
				setInterval(function(){
					$(".login").css("display","none");
					$(".zhezhao").css("display","none");
				},3000);
				
				//显示登录的信息
				$(".nologin").css("display","none");
				$(".info").css("display","block");
				var useInfo = `<a href="javascript:;">${response.result.userId}</a>`;
				$(".info li").eq(0).html(useInfo);
			};
			var msg=`${response.message}`;
			$("#msg").html(msg);
			localStorage.setItem("userId",response.result.userId);
			localStorage.setItem("token",response.token);

			
		}
	});
}







//	var xhr = new XMLHttpRequest();
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState == 4){
//			//接收完文件要做的事情，让h1的内容变为读取的东西
//			var str = xhr.responseText;
//			var aa = JSON.parse(str)
//			console.log(aa.data)
//		}
//	}
//	xhr.open("got","http://localhost:3000/users/login",true);
//
//	xhr.send({"userId":username,"password":password});




