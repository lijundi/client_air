//公共变量
var msg_temp_para = {
	setpara:{
		// mode:0,
		highfan_change_temp:1.5,
		lowfan_change_temp:0.5,
		medfan_change_temp:1.0
	}
};

var msg_temp = {
    serving:false,
    fanSpeed: 1,
	tar_temp: 25
};

var msg_temp_update = {
	temp_update:{
		room_id: 1,
		cur_temp: 25.0
	}
};

var msg_power_on = {
    poweron:{
        room_id: 1,
        cur_temp: 25.0
    }
};

var msg_power_off = {
    poweroff:{
        room_id: 1,
        state: 0
    }
};

var msg_config= {
    config:{
        room_id: 1,
		fan: 0,
		mode: 0,
		target_temp: 25
    }
};

//主要函数
$(function() {
    $('#myModal').modal('show')
});

function init() {
	// v.wurl = "ws://"+v.ip+":"+v.port+"/server/websocket/";
    v.wurl = "ws://"+v.ip+":"+v.port;
	msg_power_on.poweron.room_id = Number(v.room_id);
	msg_power_off.poweroff.room_id = Number(v.room_id);
	msg_config.config.room_id = Number(v.room_id);
	msg_temp_update.temp_update.room_id = Number(v.room_id);
	air_ws = new WebSocket(v.wurl);
	air_ws.onopen = function(){alert("connect server ok");};
	air_ws.onmessage = function (evt) {
        air_ws_handle(evt);
    };
	temp_ws = new WebSocket("ws://127.0.0.1:8000/temperature/websocket/");
	temp_ws.onopen = function(){alert("connect temp simulation ok");};
	temp_ws.onmessage = function(evt){
	    temp_ws_handle(evt);
	};

	setInterval(function(){temp()},1000); //1秒发一次室温请求
	// setInterval(function(){update_temp(v.cur_temp)},10000); //10秒发一次室温请求
}

function tar_temp_plus() {
	if(v.tar_temp < v.highlimit_temp)
		v.tar_temp+=1;
	else
		alert("温度已达上限值！");
}

function tar_temp_minus() {
	if(v.tar_temp > v.lowlimit_temp)
		v.tar_temp-=1;
	else
		alert("温度已达下限值！");
}

// window.onunload = function() {
//     alert("sure?");
//     air_ws.close();
//     temp_ws.close();
// };
