import { request } from "../utils";

export function getChannelAPI(){
    return request({
        url:'Article/Channels',
        method:'GET'
    })
}
export function createArticleAPI(data){
    return request({
        url:'Article/Create',
        method:'POST',
        data
    })
}