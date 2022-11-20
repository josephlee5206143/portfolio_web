
//////////////////////////////////////////////////
//點擊置頂
const ToTop = document.getElementById('ToTop')
var timer  = null;
ToTop.onclick = function(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            scrollTo(0,oTop-150);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}


    //////////
    // title動畫
const text = document.getElementById('text');
var str = "Hi! I'm Joseph Lee!"
var splitstr = str.split('');
timeInterval = 150;
i = 0;
function type(){
  if(i<splitstr.length){
    text.append(splitstr[i]);
    i++;
    setTimeout(function () {
      type();
    }, timeInterval);
  }else{}
}
type();

