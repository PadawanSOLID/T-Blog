import { request } from "../utils";

export function getChannelAPI() {
    return request({
        url: 'Article/Channels',
        method: 'GET'
    })
}
export function createArticleAPI(data) {
    return request({
        url: 'Article/Create',
        method: 'POST',
        data
    })
}
export function getArticleListAPI(params) {
    return request({
        url: 'Article/Articles',
        method: 'GET',
        params
    })
}