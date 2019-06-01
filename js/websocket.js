// var air_ws = new ReconnectingWebSocket(v.wurl);
var air_ws;
var temp_ws;

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
        if(d.hasOwnProperty("setpara")){
            if(d.setpara === "ok"){
                //alert("temp setpara ok");
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
                v.on_off = true;
                v.serving = true;
                v.state = 1;
                // alert("poweron:ok")
            }
            else if(d.poweron === "busy"){
                v.on_off = true;
                v.serving = false;
                v.state = 1;
            }
            else{
                v.on_off = false;
                alert("poweron:error");
            }
        }
        if(d.hasOwnProperty("setpara")){
            v.mode = d.setpara.mode;
            v.tar_temp = d.setpara.target_temp;
            v.fan_speed = String(d.setpara.fan);
            v.highlimit_temp = d.setpara.highlimit_temp;
            v.lowlimit_temp = d.setpara.lowlimit_temp;
            temp_para(d.setpara.lowfan_change_temp, d.setpara.medfan_change_temp, d.setpara.highfan_change_temp);
        }
        if(d.hasOwnProperty("poweroff")){
            if(d.poweroff === "ok"){
                v.on_off = false;
                v.state = 0;
                alert("poweroff:ok");
            }
            else {
                v.on_off = true;
                alert("poweroff:fail");
            }
        }
        if(d.hasOwnProperty("config")){
            if(d.config === "ok"){
                // alert("config:ok");
            }
            else{
                alert("config:fail");
            }
        }
        if(d.hasOwnProperty("finish")){
            v.serving = false;
            v.state = 2;
            // alert("finish:ok");
        }
        if(d.hasOwnProperty("cost")){
            v.fee = d.cost;
        }
    }
}

//设置室温模拟参数
function temp_para(l, m, h) {
    msg_temp_para.setpara.lowfan_change_temp = l;
    msg_temp_para.setpara.medfan_change_temp = m;
    msg_temp_para.setpara.highfan_change_temp = h;
    temp_ws.send(JSON.stringify(msg_temp_para));
}
//获取当前室温
function temp() {
    msg_temp.fanSpeed = Number(v.fan_speed);
    msg_temp.serving = v.serving;
    msg_temp.tar_temp = v.tar_temp;
    temp_ws.send(JSON.stringify(msg_temp));
}

//更新室温至服务端
function update_temp(current_temp) {
    msg_temp_update.temp_update.cur_temp = current_temp;
    air_ws.send(JSON.stringify(msg_temp_update));
}
//开机
function power_on(current_temp) {
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
    msg_config.config.fan = Number(fan);
    msg_config.config.mode = mode;
    msg_config.config.target_temp = target_temp;
    air_ws.send(JSON.stringify(msg_config));
    alert("配置参数已发送");
}