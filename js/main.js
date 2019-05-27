//公共变量
var msg_start = {
    start:true
};

var msg_temp = {
    serving:false,
    fanSpeed:1,
    tar_temp:25
};

var msg_temp_update = {
	temp_update:{
		room_id: 1,
		cur_temp: 25
	}
};

//主要函数
$(function() {
    $('#myModal').modal('show')
});

function init() {
	v.wurl = "ws://"+v.ip+":"+v.port+"/server/websocket/";
	start();
	temp(v.on_off);
	//setInterval(function(){temp(v.on_off)},10000); //10秒发一次室温请求
}

