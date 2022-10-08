<template>
  <van-tabbar fixed route>
  <van-tabbar-item to="" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/home/classify" icon="apps-o">分类</van-tabbar-item>
  <van-tabbar-item to="/home/shopping" icon="cart-o" :badge="badge" id="shop-car">购物车</van-tabbar-item></van-tabbar-item>
  <van-tabbar-item to="/me" icon="user-circle-o">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            counterMap:(state)=>state.counterMap
        }),
        badge(){
           const count = Object.values(this.counterMap).reduce((prev,next)=>prev+next,0);
           if(count >99){
               return '99+'
           }else{
               return count
           }
        }
    }
};
</script>

<style>
</style>