import axios from "axios"



export const commonApi =async(httprequest , url , reqbody , reqheader)=>{
    const regconfig={
        method:httprequest,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
    }
    return await axios(regconfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}