import { request } from "../utils";

export function loginAPI(formData) {
    return request({
        url: 'authorize/Login',
        method: 'POST',
        data: formData
    })
}

export function getProfileAPI(){
    return request({
        url:'authorize/profile',
        method:'GET',
    })
}