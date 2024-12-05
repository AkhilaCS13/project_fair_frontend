import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateprofileApi } from '../../services/allApi';
import { Collapse } from 'react-bootstrap';


function Profile() {
  //for collapse
  const [open, setOpen] = useState(false);

  const [userdetails, setuserdetails] = useState({
   
    username: "",
    email: "",
    password: "",
    profile: "",
    github: "",
    linkedin: ""
  })
  const [existingimg, setexistingimg] = useState("")
  const [preview, setpreview] = useState("")
  const [updatestatus , setupdatestatus] = useState({})

  console.log(userdetails);

  const handlefile = (e) => {
    setuserdetails({ ...userdetails, profile: e.target.files[0] })
  }

  const handleUpdate =async()=>{
    const { username , email , password , profile, github , linkedin} = userdetails
    if(!github || !linkedin){
      toast.info('Please add github or linkedin')
    }
    else{
      const reqbody = new FormData()
      reqbody.append("username" , username)
      reqbody.append("email" , email)
      reqbody.append("password" , password)
      reqbody.append("github" , github)
      reqbody.append("linkedin" , linkedin)
      preview?reqbody.append("profile" , profile):reqbody.append("profile",existingimg)

      const token = sessionStorage.getItem("token")
      if(preview){
        const reqheader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateprofileApi( reqbody , reqheader)
        console.log(result);

        if(result.status==200){
          toast.success('Updated Successfully')
          sessionStorage.setItem("existinguser",JSON.stringify(result.data))
          setupdatestatus(result)

        }
        else{
          toast.error("Something went wrong")
        }
        
      }
      else{
        const reqheader ={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateprofileApi( reqbody , reqheader)
        console.log(result);

        if(result.status==200){
          toast.success('Updated Successfully')
          sessionStorage.setItem("existinguser",JSON.stringify(result.data))
          setupdatestatus(result)

        }
        else{
          toast.error("Something went wrong")
        }
      }

    }
  }

  useEffect(() => {
    if (userdetails.profile) {
      setpreview(URL.createObjectURL(userdetails.profile))
    }
  }, [userdetails.profile])

  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const user = JSON.parse(sessionStorage.getItem("existinguser"))
      // console.log(user);
      setuserdetails({ ...userdetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setexistingimg(user.profile)

    }
  }, [updatestatus])

  return (
    <>
      <div className='p-4 shadow w-100 ' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className='d-flex justify-content-between'>
          <h3 className='mt-4'>Profile</h3>
          <button  onClick={() => setOpen(!open)} className='btn' style={{ borderColor: 'rgb(160,98,192)', color: 'rgb(160,98,192)' }}>{open==true? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
        </div>

        <Collapse in={open}>
          <div>
            <div className='d-flex justify-content-center align-items-center flex-column mt-3'>
              <label htmlFor="profileImage" className='mb-4 d-flex justify-content-center align-items-center'>
                <input id='profileImage' type="file" style={{ display: 'none' }} onChange={(e) => handlefile(e)} />
                { existingimg==""?
                    <img src={preview?preview:"https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png"} alt="no image" style={{width:"200px", height:"200px", borderRadius:"50%"}}/>
                    :
                    <img src={preview?preview:`${serverUrl}/upload/${existingimg}]`} alt="no image" style={{width:"200px", height:"200px", borderRadius:"50%"}}/>
                }
              </label>
    
              <div className='w-100'>
                <div className="mb-3">
                  <input type="text " placeholder='github' className='form-control' value={userdetails?.github} onChange={(e) => setuserdetails({ ...userdetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text " placeholder='LinkedIn' className='form-control' value={userdetails?.linkedin} onChange={(e) => setuserdetails({ ...userdetails, linkedin: e.target.value })} />
                </div>
                <div className="mb-3">
                  <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>


        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>

      </div>
    </>
  )
}

export default Profile
