<template>
  <div class="classify-wrapper">
    <!--顶部搜索-->
    <router-link tag="div" to="/search" class="search-btn">
      <van-icon name="search" />
      <div class="text">荔枝新鲜1元一斤</div>
    </router-link>
    <!--顶部分类-->
    <OneTab></OneTab>
    <template v-if="showContent">
        <SideBar></SideBar>
        <GoodsList></GoodsList>
    </template>
    <van-loading v-else size="2rem" vertical/>
  </div>
</template>

<script>
import OneTab from "../components/OneTab.vue";
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';
import {mapState} from "vuex"
export default {
  components: { OneTab,SideBar,GoodsList},
  data(){
    return {

    }
  },
  computed:{
      ...mapState({
          showContent:(state) =>state.showContent,
          sideList:(state)=>state.sideList
      })
      
  },
    watch:{
        showContent(){
            if(this.showContent){
                this.$store.dispatch('reSetGoodsList');
                this.$store.dispatch('getGoodsList',{type:this.sideList[0],page:1,sortType:'all'});
            }
        }
    }

};
</script>

<style lang="less">
.classify-wrapper {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    background: #eee;
    border-radius: 10px;
    margin: 11px auto 0;
    text-align: center;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
    .text {
      font-size: 14px;
      color: #a1a1a1;
    }
  }
}
</style>