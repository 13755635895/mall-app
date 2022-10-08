import axios from 'axios'
const instance = axios.create({
    baseURL:'https://mallapi.duyiedu.com/goods/'
})
const appkey='wjl_1651237150615';
instance.interceptors.request.use((config)=>{
    return {
        ...config,
        params:{
            ...config.params,
            appkey
        }
    }
},error=>{
    return Promise.reject(error)
})

instance.interceptors.response.use((response)=>{
    return response.data
},error=>{
    return Promise.reject(error)
})
export default instance;