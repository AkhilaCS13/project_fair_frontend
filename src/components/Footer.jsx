import { faStackOverflow ,faInstagram , faXTwitter , faFacebookF , faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <>
      <div className='container-fluid bg-success '>
        <div className="row p-4">
            <div className="col-md-3">
            <h1 className='text-light '><FontAwesomeIcon icon={faStackOverflow} className='me-2'/>Project Fair</h1>
            <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat obcaecati, aliquam minus delectus nesciunt cumque odit laboriosam minima necessitatibus quas voluptate ullam? Incidunt alias itaque repellat ab beatae expedita. </p>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center ">
           <div>
                <h1 className='text-light '>Links</h1>
                <p className='mt-3'>Home</p>
                <p>Project</p>
                <p>DashBoard</p>
           </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-2 d-md-flex justify-content-center">
           <div>
                <h1 className='text-light '>Guides</h1>
                <p className='mt-3'>React</p>
                <p>React Bootstrap</p>
                <p>React Bootswatch</p>
           </div>
            </div>
            <div className="col-md-3">
            <h1 className='text-light '>Contact Us</h1>
            <div className='d-flex mt-3'>
                <input type="text" placeholder='Email-id' className=' form-control '/>
                <button className='btn btn-warning rounded ms-2'>Subscribe</button>
                </div>
                <div className='d-flex mt-3 justify-content-between'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>
                <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-light'/>
                <FontAwesomeIcon icon={faFacebookF} className='fa-2x text-light'/>
                <FontAwesomeIcon icon={faLinkedinIn} className='fa-2x text-light'/>
                </div>
           
            </div>
        </div>
       

      </div>
    </>
  )
}

export default Footer
