
//验证码对像
var randVerCode={
	//列举所有的字符
	str : [
		'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'o','p','q','r','s','t','x','u','v','y','z','w','n',
    '0','1','2','3','4','5','6','7','8','9'
	],
	//列举所有的字体
	font : [
	"Times New Roman","Georgia","Serif","sans-serif","arial","tahoma","Hiragino Sans GB"
	],
	//随机字符串（4位）的方法
	randStr : function(){
		var str='';
		for(var i=0;i<4;i++){
			var index = Math.floor(Math.random()*(this.str.length-1));
			str += '<span style="color:'+ this.randColor() +';-webkit-transform:rotate('+ this.randDeg() +'deg);">'+ this.str[index] +'</span>';
		}
		return str;
	},
	//随机颜色（使用rgb）的方法
	randColor : function(){
		var r = Math.floor(Math.random()*250);
		var g = Math.floor(Math.random()*250);
		var b = Math.floor(Math.random()*250);
		var color = 'rgb('+r+','+g+','+b+')';
		return color;
	},
	//随机字体的方法
	randFont : function(){
		var index = Math.floor(Math.random()*(this.font.length-1));
		var font=this.font[index];
		return font;
	},
	//随机角度的方法
	randDeg : function(){
		var deg = Math.floor(Math.random()*60-30);
		return deg;
	},
	//改变字符串的方法
	changeStr : function(obj){
		var str=this.randStr();
		obj.innerHTML=str;
		obj.style.fontFamily=this.randFont();
		obj.style.color=this.randColor();
	}
};


//获取函数
var oBox=$('.verification-img')[0];
var oText=$('#verification')[0];
//初始化
randVerCode.changeStr(oBox);
//点击验证码框，改变验证码
oBox.onclick=function(){
	randVerCode.changeStr(oBox);
};
