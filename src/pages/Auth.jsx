import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'


function Auth({ register }) {
  const navigate = useNavigate()
  const {loginresponse} = useContext(loginResponseContext)
  const [userdetails, setuserdetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  // console.log(userdetails);

  const handleregister = async () => {
    const { username, email, password } = userdetails
    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await registerApi({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration Successfull')
        setuserdetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 406) {
        toast.warning(result.response.data)
      }
      else {
        toast.error('Something went wrong')
      }

    }
  }

  const handlelogin = async ()=>{
    const {email,password} = userdetails
    if(!email || !password){
      toast.info('please fill the form completely')
      
    }
    else{
      const result = await loginApi({email,password})
      // console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        loginresponse(true)

        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))
        sessionStorage.setItem('token',result.data.token)

        setuserdetails({
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        setuserdetails({
          email: "",
          password: ""
        })
    }
    else{
      toast.error('Something went wrong')
      setuserdetails({
        email: "",
        password: ""
      })
    }
      
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <h5 className='text-warning'><FontAwesomeIcon icon={faArrowLeft} />Back to home</h5>

            </Link>            <div className='bg-info p-5 rounded '>
              <div className="row">
                <div className="col-md-6 p-5">
                  <img src="https://cdn-icons-png.flaticon.com/512/457/457664.png" alt="" className='w-50' />
                </div>
                <div className="col-md-6 text-light ">
                  <div className=' my-5'>
                    <h1 className=' '><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h1>
                    {!register ?
                      <h4>sign In to your account</h4>
                      :
                      <h4>sign up to your account</h4>}
                  </div>

                  {register &&
                    <input type="text" placeholder='Username' value={userdetails.username} onChange={(e) => setuserdetails({ ...userdetails, username: e.target.value })} className='form-control rounded-0 mt-3' />}
                  <input type="text" placeholder='neel@gmail.com' value={userdetails.email} onChange={(e) => setuserdetails({ ...userdetails, email: e.target.value })} className='form-control rounded-0 mt-3' />
                  <input type="password" placeholder='.....' value={userdetails.password} onChange={(e) => setuserdetails({ ...userdetails, password: e.target.value })} className='form-control rounded-0 mt-3' />

                  {!register ? <div>
                    <button onClick={handlelogin} className='btn rounded-0 bg-warning w-100 mt-3 text-light'>Login</button>
                    <p className='mt-3 '>New User? Click here to <Link to={'/register'}>Register</Link></p>
                  </div>
                    :
                    <div>
                      <button onClick={handleregister} className='btn rounded-0 bg-warning w-100 mt-3 text-light'>Register</button>
                      <p className='mt-3 '>Already a User? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>}

                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth
