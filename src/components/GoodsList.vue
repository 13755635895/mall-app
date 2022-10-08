<template>
  <div class="goodsList-wrapper">
    <div class="goodsList-header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @click="changeType('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @click="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        @click="changeType('price')"
        :class="{
          'price-up': type == 'price-up',
          'price-down': type == 'price-down',
        }"
      >
        价格
      </div>
    </div>
    <div class="goodsList-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
        <GoodsCart v-for="(item,i) in removeSame(goodsList)" :key="i" :num="counterMap[item.id]"
        v-bind="item"></GoodsCart>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import GoodsCart from './GoodsCart.vue'
import {mapState} from 'vuex';
export default {
    components:{
        GoodsCart,
    },
  data() {
    return {
      type: "price-up",
      isLoading: false, //下拉刷新加载
      loading:false,
      finished:false,
      page:1,
    };
  },
  computed:{
    ...mapState({
        goodsList:(state)=>state.goodsList,
        counterMap:(state) =>state.counterMap,
    })
  },
  mounted(){
  },
  methods: {
      //去重
    removeSame(arr){
        let map = new Map();
       for(let i of arr){
           if(!map.has(i.id)){
               map.set(i.id,i)
           }
       }
       return [...map.values()]
    },
    //下拉刷新
    onRefresh() {
    this.isLoading = true;
    this.finished = false;
    this.isLoading = false;
    this.page=1;
    this.$store.dispatch('reSetGoodsList');
    this.$store.dispatch('getGoodsList',{page:1,sortType:this.type})
    this.isLoading = false;
    },
    async onLoad(){
        if(this.finished){
            return
        }
        this.page+=1;
        this.loading = true;
        const result = await this.$store.dispatch('getGoodsList',{page:this.page,sortType:this.type});
        if(result){
            this.loading = false;
        }else {
            this.finished = true;
        }
        this.loading = false;
    },
    changeType(type) {
      if (type == "all") {
        this.type = "all";
      } else if (type == "sale") {
        this.type = "sale";
      } else {
        if (this.type == "price-up") {
          this.type = "price-down";
        } else {
          this.type = "price-up";
        }
      }
    },
  },
};
</script>

<style lang='less'>
 .van-pull-refresh {
    overflow: unset !important;
    -webkit-user-select: none;
    user-select: none;
}
.goodsList-wrapper{
   transform: translateY(0);
    transition: all .3s;
    position: fixed;
    border-top: 1px solid #eee;
    top: 135px;
    right: 0;
    width: 296px;
    bottom: 50px;
    overflow: auto;
}
.goodsList-header {
   position: sticky;
      top: 0;
      height: 25px;
      width: 280px;
      padding: 0 8px;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
      display: flex;
      font-size: 12px;
      justify-content: flex-end;
      z-index: 100;
      background: #fff;
  div {
        height: 25px;
        line-height: 25px;
        width: 50px;
        text-align: center;
        color: #aaa;
        position: relative;
  }
  .active,
  .price-up,
  .price-down {
    font-weight: bold;
    color: #ff1a90;
  }
  .price::after {
    content: "";
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    bottom: 4px;
    right: 0;
    margin-left: 4px;
  }
  .price::before {
    content: "";
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    top: 4px;
    right: 0;
    margin-left: 4px;
  }
  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down::after {
    border-top-color: #ff1a90;
  }
}

</style>