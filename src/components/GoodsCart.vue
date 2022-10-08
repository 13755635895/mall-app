<template>
  <div class="goods-cart-wrapper van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" alt="" ref="img"/>
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">￥ {{ price }}</div>
      <div class="counter">
          <div @click="counter(id,-1)" v-if="num">
              <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
          </div>
          <div class="num">
              {{num?num:0}}
          </div>
          <div @click="counter(id,1)">
               <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animate from '../tools/animate';
export default {
  props: ["images", "tags", "title", "price", "desc","id","num",'nofly'],
  data(){
      return {
      }
  },
  methods:{
    counter(id,num){
        this.$store.dispatch('storageChange',{id,value:num})
        if(num ==-1) {
            return 
        }
        if(this.nofly){
            return
        }
        //图片的位置
        const {top,left} = this.$refs.img.getBoundingClientRect();
        // console.log(top,left,'---')
        //图片的大小
        const {offsetWidth:imgWidth,offsetHeight:imgHeight} = this.$refs.img;
        // console.log(imgWidth,imgHeight,'===')
        const shopCar = document.getElementById('shop-car');
        //购物车的位置
        const {left:carX,top:carY} = shopCar.getBoundingClientRect();
        //购物车的大小
        const {offsetWidth:carWidth,offsetHeight:carHeight} = shopCar;
        const endX = carX+carWidth/2;
        const endY = carY+carHeight/2;
        Animate({
            startX:left,
            startY:top,
            endX,
            endY,
            src:this.$refs.img.src,
            width:imgWidth,
            height:imgHeight
        })
    }
  }
};
</script>

<style lang='less'>
.counter{
    position: absolute;
    bottom: 12px;
    right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    div:not(.num){
        width: 16px !important;
        height: 16px !important;
    }
    img{
        width:16px;
        height:16px;
    }
    .num{
        padding:0 5px;
        width: 16px !important;
    }
}
.goods-cart-wrapper {
  padding-top: 4px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  height: 100px;
  .card-img {
    width: 90px;
    margin: 0 10px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    div {
      width: 170px;
      margin-top: 5px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      div {
        border: 1px solid #aaa;
        font-size: 8px;
        padding: 2px;
        width: auto;
        color: #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>