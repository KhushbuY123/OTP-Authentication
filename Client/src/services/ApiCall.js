import axios from 'axios';

export const commanrequest=async (methods,url,body,header)=>{
    let config={
        method:methods,
        url,
        headers:header?header:{
            "Content-Type":"application/json"
        },
        data:body
    }
    //axios instance
    console.log(methods)
    return axios(config).then((res)=>{
        return res
    }).catch((err)=>{
        console.log(err)
        return err
    })
}

