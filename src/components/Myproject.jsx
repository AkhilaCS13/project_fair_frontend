import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeuserprojectApi, userprojectApi } from '../../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, updateResponseContext } from '../context/Contextshare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Myproject() {

  const [userproject , setuserproject] = useState([])
  const {addresponse} = useContext(addResponseContext)
  const {updateresponse} = useContext(updateResponseContext)
  const [removeproject , setremoveproject] = useState("")
 
  const getuserproject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqheader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await userprojectApi(reqheader)
      // console.log(result.data);
      setuserproject(result.data);
    }
  }

  console.log(userproject);

  const handleDelete = async(id)=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqheader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await removeuserprojectApi(id,reqheader)
      // console.log(result);
      if(result.status==200){
        setremoveproject(result)
      }
      else{
        toast.error('Something went wrong')
      }
      
    }
  }
  

  useEffect(()=>{
    getuserproject()
  },[addresponse,removeproject,updateresponse])


  return (
   <>
        <div className='p-4 shadow w-100'>
          
          <div className='d-flex mt-4 justify-content-between '>
            <h3 className='text-succes '>My Project</h3>
            <Addproject/>
          </div>

           {userproject?.length>0 ?
           userproject?.map((item)=>(
               <div className='p-3 mt-4 bg-secondary rounded-2 d-flex justify-content-between align-items-center'>
               <h4>{item.title}</h4>
               <div className="d-flex">
                   <Edit projects ={item}/>
                  <Link to={item?.website} target='_blank'> <FontAwesomeIcon icon={faGlobe}  className='text-warning mx-3'/></Link>
                   <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success mx-3 '/></Link>
                   <FontAwesomeIcon onClick={()=>handleDelete(item?._id)} icon={faTrash} className='text-danger mx-3'/>

               </div>
           </div>
           ))
           :
           <h4 className='text-center text-warning mt-5'>No project is added</h4>
           }

        </div>

        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>

   </>
  )
}

export default Myproject
