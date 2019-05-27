function start() {
    var ws = new WebSocket("ws://127.0.0.1:8000/temperature/start/");
    ws.onopen = function() {
        ws.send(JSON.stringify(msg_start));
        //alert("sending");
    };
    ws.onmessage = function(evt) {
        var d = JSON.parse(evt.data);
        // if(d['status']=="fail")
        //     alert("fail to start!!!");
    };
    ws.onclose = function() {
        //alert("start over");
    };
}

function temp(para) {
    // 打开一个 web socket
    var ws = new WebSocket("ws://127.0.0.1:8000/temperature/");

    ws.onopen = function () {
        ws.send(JSON.stringify(msg_temp));
        //alert('sending!!!')
    };

    ws.onmessage = function (evt) {
        var t = JSON.parse(evt.data);
        //alert("温度:" + t['temp']);
        v.cur_temp = t['temp'];
        if(para === 1){
            update_temp(t['temp']);
        }
    };

    ws.onclose = function () {
        //alert("get temp over")
    };
}

function update_temp(current_temp) {
    var ws = new WebSocket(v.wurl);
    ws.onopen = function() {
        msg_temp_update.temp_update.cur_temp = current_temp;
        ws.send(JSON.stringify(msg_temp_update));
        //alert("sending");
    };
    ws.onmessage = function(evt) {
        if(evt.data){
            var d = JSON.parse(evt.data);
            //alert(evt.data);
            v.fee = d['cost'];
            if(d['finish']==='')
                v.serving = false;
        }
    };
    ws.onclose = function() {
        //alert("start over");
    };
}