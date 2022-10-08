<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
      title="购物车"
      right-text="删除"
      @click-right="del"
    />
    </div>
    <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result"  ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <GoodsCart
            v-bind="item"
            :nofly="true"
          :num="counterMap[item.id]"
          ></GoodsCart>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import GoodsCart from '../components/GoodsCart.vue';
import {Dialog, Toast} from 'vant';
export default {
  data() {
    return {
      checked: false,
      result: [],
      list: [],
    };
  },
  components: {
    GoodsCart,
  },
  methods: {
    ...mapMutations(['storageChange']),
    checkAll() {
      
      if (!this.$refs.checkboxGroup) {
        Toast('购物车没有任何有效商品');
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
      console.log(this.result,'---')
    },
    async addCounter(id, value) {
      try {
        if (this.counterMap[id] === 1 && value === -1) {
          await this.$Dialog.confirm({ message: '您是否要删除已选中商品' });
          this.list = this.list.filter((item) => item.id !== id);
        }
        this.$store.dispatch('storageChange',{ id, value });
      } catch (error) {
        console.log('用户取消点击');
      }
    },
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
        return;
      }
      try {
          await Dialog.confirm({message:'您是否要删除选中商品？'});
          this.result.forEach((id) => {
              this.$store.dispatch('storageChange',{id,value:-Infinity})
          });
          this.list = this.list.filter((item)=>!this.result.includes(item.id))
      } catch (error) {
          Toast('您点击了取消')
      }
    },
    onSubmit() {
    },
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
    //   this.$nextTick(() => {
    //     if (this.$refs.checkboxGroup) {
    //       this.$refs.checkboxGroup.toggleAll(true);
    //     }
    //   });
    },
  },
  watch: {
    counterMap() {
      // this.getAllData();
    },
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    },
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return (Math.round(num * next.price * 100) + prev);
      }, 0);
    },
  },
  mounted() {
      
    this.getAllData();
    // console.log(this.result,'result')
  },
};
</script>
<style lang="less" scoped>
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .shopping {
    background: #eee;
    min-height: 100vh;
  }
  .card-none {
    width: 100%;
    position: absolute;
    top: 46px;
    img {
      width: 100%;
    }
  }
  .card-list {
    width: 100%;
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
    display: flex;
    justify-content: center;
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
    }
  }
</style>

<style>
.shopping > .van-submit-bar {
  bottom: 50px;
}
</style>