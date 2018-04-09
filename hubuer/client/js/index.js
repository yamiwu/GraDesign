//检测是否登录

//请求分类名称
$.ajax({
	type: "get",
	url: "http://localhost:3000/cats",
	success: function(response) {
		response =JSON.parse(response).data;
		console.log(response);
		var html="";
		for(let i = 0; i < response.length; i++) {
			html+=`
				<li class='listBtn' cat_id=${response[i].cat_id}><span>${response[i].cat_name}</span></li>
			`
		}
		$(".Ul").append(html);
		$(".listBtn").click(function(e){
			e.preventDefault();
   			var catId=$(this).attr("cat_id");//
			console.log(catId)//没毛病可以打印数据
			//跳转到分类页面
//			window.location.href='list.html?cat_id='+catId;//跳转过来catId就不是原本打印的数据
		})
	}
});


//商品列表函数

$.ajax({
	type: "get",
	url: "http://localhost:3000/goods",
	success: function(response) {
		response =JSON.parse(response).data;
		console.log(response);
		var html="";
//		for(let i = 0; i < response.length; i++) {
//			html+=`
//				<li class='listBtn' cat_id=${response[i].cat_id}><span>${response[i].cat_name}</span></li>
//			`
//		}
//		$(".Ul").append(html);
//		$(".listBtn").click(function(e){
//			e.preventDefault();
// 			var catId=$(this).attr("cat_id");//
//			console.log(catId)//没毛病可以打印数据
//			//跳转到分类页面
////			window.location.href='list.html?cat_id='+catId;//跳转过来catId就不是原本打印的数据
//		})
	}
});














//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = function(){
//	if(xhr.readyState == 4){
//		//接收完文件要做的事情，让h1的内容变为读取的东西
//		var str = xhr.responseText;
//		var aa = JSON.parse(str)
//		console.log(aa.data)
//	}
//}
//xhr.open("get","http://localhost:3000/cats",true);
//
//xhr.send();