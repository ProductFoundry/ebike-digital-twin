function startTimer(seconds, container) {
    let startTime, timer, obj, ms = seconds*1000,
        display = document.getElementById(container);
    obj = {};
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,100); // adjust this number to affect granularity
                            // lower numbers are more accurate, but more CPU-expensive
    };
    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };
    obj.stop = function() {
        ms = seconds*1000;
        clearInterval(timer);
        display.innerHTML = "0:0:0";
    };
    obj.step = function() {
        let now = Math.max(0,ms+(new Date().getTime()-startTime)),
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60, mis = Math.floor(now%1000);
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s+":"+mis;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            // if( oncomplete) oncomplete();
        }
        const right = $(".right")[0];
        $(right).append("<div>{ss: 0, sfg: 0, srg: 0, ssg: 0, cad: 0, tor:0, rpm: 0, curr: 0}</div>")
        return now;
    };
    obj.resume();
    return obj;
}