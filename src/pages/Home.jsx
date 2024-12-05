import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/frontlogo.webp'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import { homeprojectApi } from '../../services/allApi'

function Home() {

  const [islogin, setislogin] = useState(false)
  const [homeproject , sethomeproject] = useState([])

  const gethomeproject = async()=>{
    const result = await homeprojectApi()
    // console.log(result);
    sethomeproject(result.data)
    
  }
  console.log(homeproject);
  

  useEffect(() => {
    gethomeproject()
    if (sessionStorage.getItem("token")) {
      setislogin(true)
    }
    else {
      setislogin(false)
    }
  }, [])
  return (
    <>
      <div className='bg-success p-5' style={{ height: '100vh' }}>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 style={{ fontSize: '60px', color: 'white' }}>PROJECT FAIR</h1>
              <p>One stop destination for all software development project</p>
              {islogin == false ? 
              <Link to={'/login'}><button className='btn text-light p-0 mt-3 '>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                : 
              <Link to={'/dashboard'}> <button className='btn text-light p-0 mt-3 '>Manage Project <FontAwesomeIcon icon={faArrowRight} /></button></Link>
              }
            </div>
            <div className="col-md-6">
              <img src={photo} alt="no image" className='w-100' />
            </div>
          </div>
        </div>

      </div>


      <div>
        <h1 className='text-center my-5'>Explore Our Projects</h1>
        <div className="container">
          <div className="row">
            {homeproject?.map((item)=>(
               <div className="col-md-4">
               <Projectcard project={item}/>
             </div>
            ))
           }
            
          </div>
        </div>
        <Link to={'/projects'} className='text-danger'>
          <p className='text-center my-4'>see more projects</p>

        </Link>    </div>

    </>
  )
}

export default Home
