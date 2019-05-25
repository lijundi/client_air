start();
temp();
setInterval(function(){temp()},10000); //10秒发一次室温请求

var msg_start = {
    start:true
};

var msg_temp = {
    serving:true,
    fanSpeed:1,
    tar_temp:26
};

function start() {
    var ws = new WebSocket("ws://127.0.0.1:8000/temperature/start/");
    ws.onopen = function() {
        ws.send(JSON.stringify(msg_start));
        alert("sending");
    };
    ws.onmessage = function() {
        var d = JSON.parse(evt.data);
        if(d['status']=="fail")
            alert("fail to start!!!");
        ws.close();
    };
    ws.onclose = function() {
        alert("start over");
    };
}

function temp() {
    // 打开一个 web socket
    var ws = new WebSocket("ws://127.0.0.1:8000/temperature/");

    ws.onopen = function () {
        ws.send(JSON.stringify(msg_temp));
        alert('sending!!!')
    };

    ws.onmessage = function (evt) {
        var t = JSON.parse(evt.data);
        alert("温度:" + t['temp'])
        ws.close();
    };

    ws.onclose = function () {
        alert("get temp over")
    };
}