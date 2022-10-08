import axios from '../request.js';
export default {
    //获取二级菜单数据
    getSide(type){
        return axios.get('/getsidebar', {params:{ type }});
    },
    //获取二级商品数据
    getGoodsLsit(type,page,size,sort){
        return axios.get('/getGoodsList',{params:{type,page,size,sort}})
    },
    //搜索框模糊搜索
    likeSearch(value){
        return axios.get('/likeSearch',{params:{likeValue:value}})
    },
    //最终搜索
    search(type,page,size){
        return axios.get('/search',{params:{type,page,size}})
    },
    //通过id获取商品数据
    getGoodsByIds(value){
        return axios.get('/getGoodsByIds',{params:{value}})
    }
} 
