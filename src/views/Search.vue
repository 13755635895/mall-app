<template>
  <div class="search-wrapper">
    <div class="search-head">
        <van-icon size="0.5rem" class="icon" name="arrow-left" @click="$router.goBack()" />
        <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="placeholder"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
      <template #action v-if="showList">
          <div @touchend="onSearch(value)">搜索</div>
      </template>
       <template #action v-else>
         <van-icon name="cart-o" size="0.6rem" :badge="badge" class="shpo-car" id="shop-car" @click="$router.push('/home/shopping')"></van-icon>
      </template>
      
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-card" v-if="!showList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
        <GoodsCart v-for="(item,i) in goodsList" :key="i" :num="counterMap[item.id]"
        v-bind="item"></GoodsCart>
        </van-list>
    </div>
    <div class="search-history" v-if="likeList.length <=0 && showList">
        <MyHistory @clearHis="clearHis" :searchList="searchList" @search="onSearch"></MyHistory>
    </div>
  </div>
</template>

<script>
import GoodsCart from '../components/GoodsCart.vue'
import MyHistory from '../components/MyHistory.vue'
import {mapState} from 'vuex'
export default {
    components:{GoodsCart,MyHistory},
    computed:{
        ...mapState({
            counterMap:(state)=>state.counterMap
        })
    },
computed:{
    ...mapState({
        counterMap:(state)=>state.counterMap
    }),
    badge(){
        const count = Object.values(this.counterMap).reduce((prev,next)=>prev+next,0);
        if(count>99){
            return '99+'
        }else {
            return count;
        }
    } 
},
  data() {
    return {
      value: this.placeholder,
      placeholder: "酒",
      likeList: [],
      timer: null,
      loading:false,
      finished:false,
      isLoading:false,
      page:1,
      size:5,
      goodsList:[],
      showList:true,
      total:0,
      searchList:[],
    };
  },
  created(){
      this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  methods: {
      clearHis(){
          this.searchList = [];
          localStorage.setItem('searchList',[])
      },
      async onLoad(){
          const value = await this.$api.search(this.value,this.page,this.size);
          console.log(value,'---')
          this.goodsList = [...this.goodsList,...value.list]
          this.total = value.total;
          this.loading=false;
          if(this.goodsList.length >=this.total){
              console.log('111')
              this.finished = true
          }else{
              this.page+=1;
              console.log('222')
          }
      },
    formatHTML(item) {
      const reg = new RegExp(this.value, "g");
    //   console.log(reg, "---");
      return item.replace(reg, this.value.fontcolor("red"));
    },
    onSearch(value) {
        if(value){
            this.value = value
        }else{
            this.value = this.placeholder
        }
        const result = this.searchList.find((item) =>item.value === this.value);
        if(result){
            result.time = new Date().getTime()
            this.searchList.sort((a,b)=>b.time - a.time);
        }else{
            this.searchList.unshift({value:this.value,time:new Date().getTime()})
            if(this.searchList.length>=11){
                this.searchList.pop();
            }
        }
        // this.searchList.unshift({value:this.value,time:new Date().getTime()});
        localStorage.setItem('searchList',JSON.stringify(this.searchList));
        this.likeList = [];
        this.goodsList = []
        this.page=1;
        this.finished=false;
        this.onLoad();
        this.showList = false;
    },
    input() {
      if (this.value === "") {
        this.likeList = [];
        clearTimeout(this.timer);
        this.timer=null;
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          console.log(this.value);
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
          console.log(this.likeList, "===");
        }, 1000);
      }
    },
    focus() {
        this.showList = true
    },
  },
};
</script>

<style lang='less'>
.search-wrapper {
  width: 100%;
  z-index: 10;
  background: #fff;
  height: 100vh;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    z-index: 100;
    top: 0;
    left: 15px;
    position: fixed;
    align-items: center;
    .search-content {
      flex: 1;
       .shpo-car{
       margin-left: 10px;
    }
    }
   
  }
  .like-search{
      top: 50px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .search-history{
      width: 350px;
      position: absolute;
      top: 55px;
      z-index: 2;
      left: 10px;
  }
  .goods-card{
      position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
}
</style>