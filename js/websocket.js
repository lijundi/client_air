// var air_ws = new ReconnectingWebSocket(v.wurl);
var air_ws;
//var temp_ws = new WebSocket("ws://127.0.0.1:8000/temperature/start/");

//temp_ws的处理函数
function temp_ws_handle(evt) {
    if(evt.data){
        var d = JSON.parse(evt.data);
        if(d.hasOwnProperty("temp")){
            v.cur_temp = d.temp;
            if(v.on_off){
                update_temp(d.temp);
            }
        }
    }
}

//air_ws的处理函数
function air_ws_handle(evt) {
    if(evt.data){
        var d = JSON.parse(evt.data);
        //alert(d);
        if(d.hasOwnProperty("poweron")){
            if(d.poweron === "ok"){
                v.serving = true;
                v.state = 1;
            }
            else if(d.poweron === "busy"){
                v.serving = false;
                v.state = 1;
            }
            else{
                alert("poweron:error");
            }
        }
        if(d.hasOwnProperty("setpara")){
            v.mode = d.setpara.mode;
            v.tar_temp = d.setpara.target_temp;
            v.fan_speed = d.setpara.fan;
        }
        if(d.hasOwnProperty("poweroff")){
            if(d.poweroff === "ok"){
                v.on_off = false;
                v.state = 0;
            }
            else {
                alert("poweroff:fail");
            }
        }
        if(d.hasOwnProperty("config")){
            if(d.config === "ok"){

            }
            else{
                alert("config:fail");
            }
        }
        if(d.hasOwnProperty("finish")){
            v.serving = false;
            v.state = 2;
        }
        if(d.hasOwnProperty("cost")){
            v.fee = d.cost;
        }
    }
}

//启动室温模拟
function start() {
    // var ws = new ReconnectingWebSocket("ws://127.0.0.1:8000/temperature/start/");
    // ws.onopen = function() {
    //     ws.send(JSON.stringify(msg_start));
    //     //alert("sending");
    // };
    // ws.onmessage = function(evt) {
    //     var d = JSON.parse(evt.data);
    //     // if(d['status']=="fail")
    //     //     alert("fail to start!!!");
    // };
    // ws.onclose = function() {
    //     //alert("start over");
    // };
    temp_ws.send(JSON.stringify(msg_start))
}
//获取当前室温
function temp() {
    temp_ws.send(JSON.stringify(msg_temp));
}

//更新室温至服务端
function update_temp(current_temp) {
    // var ws = new WebSocket(v.wurl);
    // ws.onopen = function() {
    //     msg_temp_update.temp_update.cur_temp = current_temp;
    //     ws.send(JSON.stringify(msg_temp_update));
    //     //alert("sending");
    // };
    // ws.onmessage = function(evt) {
    //     if(evt.data){
    //         var d = JSON.parse(evt.data);
    //         //alert(evt.data);
    //         v.fee = d['cost'];
    //         if(d['finish']==='')
    //             v.serving = false;
    //     }
    // };
    // ws.onclose = function() {
    //     //alert("start over");
    // };
    msg_temp_update.temp_update.cur_temp = current_temp;
    air_ws.send(JSON.stringify(msg_temp_update));
}
//开机
function power_on(current_temp) {
    // var ws = new WebSocket(v.wurl);
    // ws.onopen = function() {
    //     msg_power_on.poweron.cur_temp = current_temp;
    //     ws.send(JSON.stringify(msg_power_on));
    //     //alert("sending");
    // };
    // ws.onmessage = function(evt) {
    //     if(evt.data){
    //         var d = JSON.parse(evt.data);
    //         //alert(evt.data);
    //         v.mode = d.setpara.mode;
    //         v.tar_temp = d.setpara.target_temp;
    //         v.fan_speed = d.setpara.fan;
    //         if(d['poweron'] === "ok"){
    //             v.serving = true;
    //         }
    //         else if(d['poweron'] === "error"){
    //             alert("poweron:error");
    //         }
    //     }
    // };
    // ws.onclose = function() {
    //     //alert("start over");
    // };
    msg_power_on.poweron.cur_temp = current_temp;
    air_ws.send(JSON.stringify(msg_power_on));
}
//关机
function power_off() {
    msg_power_off.poweroff.state = v.state;
    air_ws.send(JSON.stringify(msg_power_off));
}
//设置工作参数
function config_para(fan, mode, target_temp) {
    msg_config.config.fan = fan;
    msg_config.config.mode = mode;
    msg_config.config.target_temp = target_temp;
    air_ws.send(JSON.stringify(msg_config))
}