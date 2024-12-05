import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useState ,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateuserprojectApi } from '../../services/allApi';
import { updateResponseContext } from '../context/Contextshare';


function Edit({projects}) {
  const {setupdateresponse} = useContext(updateResponseContext)
    const [show, setShow] = useState(false);
    const [projectdetails , setprojectdetails] = useState({
      title:projects?.title,
      language:projects?.language,
      github:projects?.github,
      website:projects?.website,
      Overview:projects?.Overview,
      projectImage:""
    })

    const [key , setkey]= useState(0)

    const [preview , setpreview] = useState("")


    const handlefile=(e)=>{
      setprojectdetails({...projectdetails,projectImage:e.target.files[0]})
    }

    useEffect(()=>{
      if(projectdetails.projectImage){
        setpreview(URL.createObjectURL(projectdetails.projectImage))
      }
    },[projectdetails.projectImage])

    // console.log(projects);

    const handleCancel = ()=>{
      setprojectdetails({
        title:projects.title,
        language:projects.language,
        github:projects.github,
        website:projects.website,
        Overview:projects.Overview,
        projectImage:""
      })
      setpreview("")
      if(key==1){
        setkey(0)
      }
      else{
        setkey(1)
      }
      handleClose()
    }


    const handleUpdate = async()=>{
      const {title , language,github,website,Overview} = projectdetails
      if(!title || !language || !github || !website || !Overview ){
        toast.info('Please fill the form completely')
      }
      else{
        //aapi call

        const reqbody = new FormData()

        reqbody.append("title" , title)
        reqbody.append("language" , language)
        reqbody.append("github" , github)
        reqbody.append("website" , website)
        reqbody.append("Overview" , Overview)
        preview?reqbody.append("projectImage" , projectImage) : reqbody.append("projectImage",projects.projectImage)

        const token = sessionStorage.getItem("token")
        if(preview){
          const reqheader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateuserprojectApi(projects._id , reqbody , reqheader)
          // console.log(result);
          if(result.status==200){
            setupdateresponse(result)
            toast.success('Project added successfully')
            setTimeout(() => {
              handleClose()
            }, 2000);
          }
          else{
            handleCancel()
            toast.error('Something went wrong')
          }
          
        }
        else{
          const reqheader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateuserprojectApi(projects._id , reqbody , reqheader)
          // console.log(result);
          if(result.status==200){
            setupdateresponse(result)
            toast.success('Project added successfully')
            setTimeout(() => {
              handleClose()
            }, 2000);
          }
          else{
            handleCancel()
            toast.error('Something went wrong')
          }

        }
        handleClose()
      }

    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
 <>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} className='mx-3' style={{color:'rgb(160,98,192)'}}  onClick={handleShow}/>
  
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title className='text-success'>Add Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="container">
                  <div className="row">
                      <div className="col-md-6">
                          <label htmlFor="projectImage">
                              <input type="file" id='projectImage' style={{display:'none'}} key={key} onChange={(e)=>handlefile(e)}/>
                              <img src={preview?preview:`${serverUrl}/upload/${projects?.projectImage}`} alt="no image" className='w-100' />
                          </label>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3 mt-2">
                              <input type="text" placeholder='title' className='form-control' value={projectdetails?.title} onChange={(e)=>setprojectdetails({...projectdetails , title:e.target.value})} />
                          </div>
                          <div className="mb-3">
                          <input type="text" placeholder='language' className='form-control' value={projectdetails?.language} onChange={(e)=>setprojectdetails({...projectdetails , language:e.target.value})}/>
                          </div>
                          <div className="mb-3">
                          <input type="text" placeholder='github' className='form-control' value={projectdetails?.github} onChange={(e)=>setprojectdetails({...projectdetails , github:e.target.value})}/>
                          </div>
                          <div className="mb-3">
                          <input type="text" placeholder='website' className='form-control' value={projectdetails?.website} onChange={(e)=>setprojectdetails({...projectdetails , website:e.target.value})}/>
                          </div>
                          <div className="mb-3">
                              <textarea rows={5} className='form-control' placeholder='Overview' value={projectdetails?.Overview} onChange={(e)=>setprojectdetails({...projectdetails , Overview:e.target.value})}></textarea>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCancel}>
              cancel
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Update 
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>

 </>


    
  )
}

export default Edit
