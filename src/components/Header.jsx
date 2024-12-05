import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';

function Header() {
    const [token, settoken] = useState("")
    const navigate = useNavigate()
    const {setloginresponse} =useContext(loginResponseContext)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            settoken(sessionStorage.getItem("token"))
        }
    }, [])

    const handleLogout=()=>{
        sessionStorage.removeItem("existinguser")
        sessionStorage.removeItem("token")
        setloginresponse(false)
        navigate('/')
    }


    return (
        <div>
            <Navbar className="bg-success  align-items-center">

                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <Navbar.Brand className='text-light' >

                        <span className='fs-3 ms-5'>
                            <FontAwesomeIcon icon={faStackOverflow} className='me-2' />
                            Project Fair
                        </span>


                    </Navbar.Brand>
                </Link>
                {token &&
                    <button onClick={handleLogout} className='btn btn-warning ms-auto rounded-0 me-5'><FontAwesomeIcon icon={faPowerOff} className='me-2' />LogOut</button>
                }                    </Navbar>
        </div>
    )
}

export default Header
