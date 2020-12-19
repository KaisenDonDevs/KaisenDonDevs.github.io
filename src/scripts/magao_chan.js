var num = 0;


(function(){
    const calcRate = function(num){
        return num <= 1 && num >= 0 ? -4 * Math.pow(num, 2) + 4 * num : 0;
    };
    const recalc = function(){
        setTimeout(function(){
            var i = num / 40;
            document.getElementById('magao_chan').style.left = Math.floor((calcRate(i) * 80 + 6).toString()) + "%";
            num++;
            if(num >= 40){
                num = 0;
            }
            recalc();
        }, 40);
    };
    recalc();
})();