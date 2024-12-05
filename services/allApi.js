import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"






//register
export const registerApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqbody,"")
}

//login

export const loginApi = async(reqbody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqbody,"")
}

//to add project

export const addprojectApi = async(reqbody , reqheader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqbody,reqheader)
}

// get home project

export const homeprojectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

// get all project

export const allprojectApi = async(searchkey,reqheader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchkey}`,"",reqheader)
}

//get user projects

export const userprojectApi = async(reqheader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqheader)
}

//remove user projects

export const removeuserprojectApi = async(id ,reqheader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-project/${id}`,{},reqheader)
}

// update user project
export const updateuserprojectApi = async(id ,reqbody,reqheader)=>{
    return await commonApi('PUT',`${serverUrl}/update-project/${id}`,reqbody,reqheader)
}

//update profile
export const updateprofileApi = async(reqbody,reqheader)=>{
    return await commonApi('PUT',`${serverUrl}/update-profile`,reqbody,reqheader)
}
