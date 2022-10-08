<template>
  <div class="history-wrapper">
      <div class="head">
        <div>历史记录：</div>
       <div class="clear" @click="clearHis" v-if="searchList.length">清空</div>
      </div>
      <div class="null" v-if="!searchList.length">暂无历史记录</div>
      <div class="his-item" v-for="(item,i) in searchList" :key="i" @click="search(item.value)">{{item.value}}</div>
  </div>
</template>

<script>
export default {
props:{
    searchList:{
        default(){
            return []
        }
    }
},
methods:{
    search(value){
        this.$emit('search',value);
    },
    clearHis(){
        console.log(111)
        this.$emit('clearHis')
    }
}
}
</script>

<style lang="less" scoped>
.history-wrapper{
    position: relative;
    height: 200px;
}
.head{
   display: flex;
//    position: relative;
   justify-content: space-between;
}
.null{
    position: absolute;
    color: #aaa;
    // text-align: center;
    margin:0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.his-item{
    padding: 15px;
    background: #eee;
    border-radius: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: inline-block;
}
.clear{
    width: 40px;
    height: 30px;
    text-align: center;
    border-radius: 10px;
    line-height: 30px;
    // color: #aaa;
    background: #aaa;
}
</style>