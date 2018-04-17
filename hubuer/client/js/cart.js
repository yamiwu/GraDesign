//判断是否登录,登录则显示用户学号
if(window.localStorage.token){
	$(".nologin").css("display","none");
	$(".info").css("display","block");
	var useInfo = `<a href="javascript:;">${window.localStorage.userId}</a>`;
	$(".info li").eq(0).html(useInfo);
}

//退出登录则还原并清空本地存储
$(".exit").click(function(){
	alert("即将退出当前账号")
	$(".nologin").css("display","block");
	$(".info").css("display","none");
	//清空本地存储
	window.localStorage.clear();
})

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
			console.log(response);
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
	console.log(password1,password2)
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
	console.log(icode)
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
	console.log(userId,password)
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
			console.log(response);
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
	console.log(username,password)

	$.ajax({
		type: "post",
		url: "http://localhost:3000/users/login",
		data:{
			"userId":username,
			"password":password
		},
		success: function(response) {
			response =JSON.parse(response);
			console.log(response);
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
			console.log(localStorage);

			
		}
	});
}

//查看购物车
showCart();
//查看购物车函数
function showCart(){
	console.log(window.localStorage.userId);
	$.ajax({
		type:"get",
		url:"http://localhost:3000/users/cartList?userId="+window.localStorage.userId,
		success: function(response) {
			response =JSON.parse(response).result;
			console.log(response);
			var html="";
			for(var i=0;i<response.length;i++){
				html+=`
					<ul>
						<li><input type="checkbox" name="" id="" value="" /></li>
						<li>
							<img src="../img/product/${response[i].good_image}" title="${response[i].goods_desc}" />	
						</li>
						<li>
							<span >${response[i].goods_name} </span>
						</li>
						<li>￥<em>${response[i].goods_price}</em></li>
						<li><input type="number" min="1" name="" id="" value="${response[i].goods_num}" /></li>
						<li>￥<em>520</em></li>
						<li><input type="button" name="" id="delete" value="删除" /></li>
					</ul>
				`;
			}
			$(".goods_List").html(html)
			
		}
	})
}
