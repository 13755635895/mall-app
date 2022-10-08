<template>
  <div class="side-bar-wrapper" ref="sideBar">
    <div
      v-for="(item, i) in sideList"
      :key="item"
      :class="{ active: index === i }"
      @touchend="scrollTo(i,$event)"
      @touchstart="move=false"
      @touchmove="move=true"
    >
      {{ i==0?'全部':item }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moveTo from '@/utils/moveTo.js'
export default {
     mounted(){
         this.$store.dispatch('reSetGoodsList');
      this.$store.dispatch('getGoodsList',{type:this.sideList[0],page:1,sortType:'all'});
  },
  data() {
    return {
      index: 0,
      move:false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods:{
      scrollTo(i,e){
          if(this.move){
              return
          }
          // son.top - p.top + son.height/2 - p.height/2 = ?
          // p.height/2 - son.top + p.top - son.henght/2 = ?
          this.index = i;
          const {sideBar} = this.$refs
          const sonTop = e.target.getBoundingClientRect().top;
          const sonHeight = e.target.offsetHeight;
          const pTop = sideBar.getBoundingClientRect().top;
          const pHeight = sideBar.offsetHeight;
          moveTo(sideBar.scrollTop,sonTop - pTop +sonHeight/2 -pHeight/2,sideBar,'scrollTop')
          //获取二级标签对应的数据
          this.$store.dispatch('reSetGoodsList')
          this.$store.dispatch('getGoodsList',{type:this.sideList[i],page:1,sortType:'all'});
      }
  },
 
};
</script>

<style lang='less'>
.side-bar-wrapper {
  position: fixed;
  left: 0;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: scroll;
  background: #f8f8f8;
  div {
    width: 79px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: relative;
    // box-sizing: border-box;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
.side-bar-wrapper::-webkit-scrollbar{
    width: 0;
    background: none;
}
</style>