import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectApi } from '../../services/allApi';
import { addResponseContext } from '../context/Contextshare';


function Addproject() {
    const [show, setShow] = useState(false);
    const {setaddresponse} = useContext(addResponseContext)

    const [ projectdetails , setprojectdetails] = useState({
      title:"",
      language:"",
      github:"",
      website:"",
      Overview:"",
      projectImage:""
    })
    // console.log(projectdetails);
    const [preview, setpreview]=useState("")
    // console.log(preview);
    const [token , settoken]=useState("")
    // console.log(token);
    const [key , setkey] = useState(1)

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        settoken(sessionStorage.getItem("token"))
      }
    },[])

    const handlefile=(e)=>{
      // console.log(e.target.files[0]);
      setprojectdetails({...projectdetails,projectImage:e.target.files[0]})
      
    }

    const handleCancel=()=>{
      setprojectdetails({
        title:"",
        language:"",
        github:"",
        website:"",
        Overview:"",
        projectImage:""
      })
      setpreview("")
      if(key==1){
        setkey(0)
      }
      else{
        setkey(1)
      }
    }

    const handleClose = () =>{
       setShow(false);
      handleCancel()
    }

    const handleAdd = async() =>{
      const {title , language , github , website , Overview ,  projectImage} = projectdetails
      if(!title || !language || !github || !website || !Overview ||  !projectImage){
        toast.info('Please fill the form completely')
      }
      else{

        const reqbody = new FormData()

        reqbody.append("title" , title)
        reqbody.append("language" , language)
        reqbody.append("github" , github)
        reqbody.append("website" , website)
        reqbody.append("Overview" , Overview)
        reqbody.append("projectImage" , projectImage)

        if(token){
          const reqheader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await addprojectApi(reqbody,reqheader)
          // console.log(result);
          if(result.status==200){
            toast.success('Project added successfully')
            setTimeout(() => {
              handleClose()
            }, 2000);

            setaddresponse(result)
            
          }
          else if(result.status==406){
            toast.warning(result.response.data)
            setTimeout(() => {
              handleCancel()
            }, 2000);
          }
          else{
            toast.error('Something went wrong')
            setTimeout(() => {
              handleClose()
            }, 2000);
          }
          
        }
        else{
          toast.warning('please login')
        }

      }
    }

    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectdetails.projectImage){
        setpreview(URL.createObjectURL(projectdetails.projectImage))
      }
    },[projectdetails.projectImage])
    
  return (
    <>
      <button className='btn btn-success rounded-0 ' onClick={handleShow}>Add project</button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input type="file" id='projectImage' key={key} onChange={(e)=>handlefile(e)} style={{display:'none'}} />
                            <img src={preview?preview:"https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg"} alt="no image" className='w-100'/>
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 mt-2">
                            <input onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})} value={projectdetails.title} type="text" placeholder='title' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} value={projectdetails.language} type="text" placeholder='language' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})} value={projectdetails.github} type="text" placeholder='github' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})} value={projectdetails.website} type="text" placeholder='website' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <textarea onChange={(e)=>setprojectdetails({...projectdetails,Overview:e.target.value})} value={projectdetails.Overview} rows={5} className='form-control' placeholder='Overview'></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>

        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>

      </Modal>


    </>
  )
}

export default Addproject
