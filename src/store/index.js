import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/interface'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
      //侧边栏数据
      sideList:[],
      showContent:false,
      size:5,
      goodsList:[],
      type:null,
      counterMap:{},
    },
  getters: {
  },
  mutations: {
    storageChange(state,{id,value}){
    if(state.counterMap[id]){
        //当钱商品添加数为0时
        if((value===-1 && state.counterMap[id] ===1) || value ===-Infinity){
            Vue.delete(state.counterMap,id)
        }else{
            Vue.set(state.counterMap,id,state.counterMap[id] + value)
        }
    }else{
        Vue.set(state.counterMap,id,1)
    }
    localStorage.setItem('goods',JSON.stringify(state.counterMap))
    },
    setSideList(state,list){
        state.sideList = list
    },
    setShowContent(state,bool){
        state.showContent = bool;
    },
    setGoodsList(state,list){
        state.goodsList = [...state.goodsList,...list]
    },
    reSetGoodsList(state){
        state.goodsList = []
    },
    setGoodsType(state,type){
        state.type = type
    },
    setCounterMap(state,map){
        state.counterMap = map;
    }
  },
  actions: {
    storageChange({commit},obj){
        commit('storageChange',obj)
    },
      setCounterMap({commit},map){
        commit('setCounterMap',map)
      },
    async setSideList({commit},type){
        commit('setShowContent',false);
        const value = await api.getSide(type);
        commit('setSideList',value)
        commit('setShowContent',true)
    },
    async getGoodsList({state,commit},options){
        // commit('setShowContent',false);
        const { page,sortType } = options;
        const type = options.type || state.type;
        const {list,total} = await api.getGoodsLsit(type,page,state.size,sortType);
        commit('setGoodsList',list)
        commit('setGoodsType',type)
        // commit('setShowContent',true)
        if(total > state.goodsList.length){
            return true
        }else {
            return false;
        }
    },
    reSetGoodsList({commit}){
        commit('reSetGoodsList')
    },
  },
  modules: {
  }
})
