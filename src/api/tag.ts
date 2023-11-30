import { RequestEnum } from "../enums/httpEnum";
import { http } from "../utils/axios";

export function getTags(params: any) {
    return http.request({
        url: '/tag',
        method: RequestEnum.GET,
        params
    })
}