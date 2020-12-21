////////////////////////////////
// まがおちゃん諸設定
// fpsをあげすぎると動作に支障をきたすことがあります。
////////////////////////////////
// まがおちゃんのfps
const fps = 30;
// まがおちゃんの周期(s)
const periodic_time = 1;
// 停止時間(s)
const stop_time = 0.2;
// マージン(%)
const margin_per = 5;

////////////////////////////////
// 諸設定による計算値
////////////////////////////////
// フレーム周期(ms)
const frame_pt = 1000 / fps; console.log("フレーム周期：" + frame_pt + "ms/frame")
// 移動周期フレーム数
const move_fnum = fps * periodic_time; console.log("移動周期フレーム数：" + move_fnum + "frames");
// 停止フレーム数
const stop_fnum = fps * stop_time; console.log("停止フレーム数：" + stop_fnum + "frames");
// 横移動フレーム数
const one_move_fnum = (move_fnum / 2) - stop_fnum; console.log("横移動フレーム数：" + one_move_fnum + "frames");
if(one_move_fnum % 1 !== 0){
     console.error("横移動フレーム数が整数ではありません。動作に支障をきたす恐れがあります。オプションの変更を検討してください。");
     throw new Error("Invalid arguments are set.");
}

////////////////////////////////
// メイン処理
////////////////////////////////
// 現在のフレーム数を管理する変数
var frame = 0;
const magao_chan = document.getElementById('magao_chan');
const magao_chan_container = document.getElementsByClassName('magao_chan_container')[0];
const one_side_margin = magao_chan_container.clientWidth * margin_per / 100;
const magao_chan_range = magao_chan_container.clientWidth - one_side_margin * 2 - magao_chan.offsetWidth;

(function(){
    const calcRate = function(num){
        return (-Math.cos(num * 2 * Math.PI) + 1) / 2;
    };
    const recalc = function(){
        setTimeout(function(){
            var i = 0;
            if(stop_fnum <= frame && frame < (stop_fnum + one_move_fnum)){
                i = (frame - stop_fnum) / (one_move_fnum * 2);
            }else if(25 <= frame && frame < 40){
                i = (frame - (stop_fnum * 2)) / (one_move_fnum * 2);
            }
            if(i !== 0){
                magao_chan.style.left = Math.floor((calcRate(i) * magao_chan_range + one_side_margin).toString()) + "px";
            }
            frame++;
            if(frame >= move_fnum){
                frame = 0;
            }
            recalc();
        }, frame_pt);
    };
    recalc();
})();