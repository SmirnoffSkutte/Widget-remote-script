import { APP_API } from "./config.js";
import {renderError} from "./render.js";

async function authedFetchGet(url){
    let key=sessionStorage.getItem('debtorsTableKey');
    if(!key){
        renderError('Нет ключа в хранилище')
    }
    let responce=await fetch(`${APP_API}/${url}`,{
        method: 'GET',
        credentials:'include',
        headers: {
            'Authorization':`Bearer ${key}`,
        },
    })
        .then(res=>{
            if(res.status===404){
                renderError(res.error)
            }
            return res.json();
        })
        .catch(err=>console.log(err))
    return responce;
};

export {authedFetchGet}