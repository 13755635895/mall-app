// 点击后，处理滚动条，缓慢滚动到中间
export default function moveTo(start,end,dom,prop) {
    let dis = 0;
          let speed = 1;
          if(end <0) {
              speed *= -1;
          }
          const t = setInterval(()=>{
              dis += speed;
              dom[prop] = start + dis
              if(Math.abs(dis) > Math.abs(end)){
               dom[prop] = start + end;
                clearInterval(t);
              }
          },2)
  }