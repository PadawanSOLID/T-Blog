import axios from "axios"
const request= axios.create({
    baseURL:'http://localhost:5225/api',
    timeout:50000
})

request.interceptors.request.use(config=>{
    const token=localStorage.getItem('token_key');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config
},error=>{
    return Promise.reject(error)
})

request.interceptors.response.use(res=>{
    return res.data
},error=>{
    console.dir(error);
    // if(error.response.status===401){
    //     localStorage.clear('token_key');
    //     router.navigate('/login')
    // }
    return Promise.reject(error)
})

export {request}