import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = ({cartItems,setCartItems}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h6 className='bg-primary w-100 text-center p-3 text-white m-0'>
                The all new Gaming PC's now on store
            </h6>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <h4 className="navbar-brand fw-bolder" href="#">ZXT Supplies</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">

                            <li className="nav-item dropdown ms-3">
                                <h5 className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">Gaming Beast            &nbsp;<i className="fa-solid fa-angle-down" ></i></h5>

                                <ul className="dropdown-menu p-3" style={{'width':'400px'}}>
                                    <h3>Build Your Own PC</h3>
                                    <img src="https://smcinternational.in/extra/images/pd-img5.png" alt=""  />
                                    <button className='btn btn-primary w-100 ' onClick={()=>navigate('/custom-build')}>Custom Build</button>
                                    <div className='row'>
                                        
                                    </div>
                                </ul>
                            </li>
                            <li className="nav-item dropdown ms-3">
                                <h5 className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pre Built            &nbsp;<i className="fa-solid fa-angle-down" ></i></h5>

                                <ul className="dropdown-menu p-3" style={{'width':'400px'}}>
                                    <h3>Buy Pre-Built Gaming Beast</h3>
                                    <img src="https://www.datocms-assets.com/34299/1677913954-prebuilt-category-performance-primary.png" className='img-fluid' alt=""  />
                                    <button className='btn btn-primary w-100 ' onClick={()=>navigate('/pre-build')}>Buy Pre Built</button>
                                    <div className='row'>
                                        
                                    </div>
                                </ul>
                            </li>


                            <li className="nav-item dropdown ms-3">
                                <h5 className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">Components            &nbsp;<i className="fa-solid fa-angle-down" ></i></h5>

                                <ul className="dropdown-menu" style={{'width':'300px'}}>
                                    <li><h6 className="dropdown-item btn">Casings</h6></li>
                                    <li><h6 className="dropdown-item btn">Motherboards</h6></li>
                                    <li><h6 className="dropdown-item btn">Processors</h6></li>
                                    <li><h6 className="dropdown-item btn">Rams</h6></li>
                                    <li><h6 className="dropdown-item btn">Graphics Card</h6></li>
                                    <li><h6 className="dropdown-item btn">Cooling</h6></li>
                                </ul>
                            </li><li className="nav-item dropdown ms-3">
                                <h5 className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">Peripherals            &nbsp;<i className="fa-solid fa-angle-down" ></i></h5>

                                <ul className="dropdown-menu" style={{'width':'300px'}}>
                                    <li><h6 className="dropdown-item btn">Softwares Solutions</h6></li>
                                    <li><h6 className="dropdown-item btn">Automation Solution</h6></li>
                                    <li><h6 className="dropdown-item btn">SAS Applications</h6></li>
                                    <li><h6 className="dropdown-item btn">Custom Softwares</h6></li>
                                </ul>
                            </li>

                        </ul>
                        <div className='d-flex text-light'>
                            <h4 className=' btn p-2 fs-5'><i className="fa-solid fa-magnifying-glass"></i></h4>
                            <h4 className=' btn p-2 fs-5' data-bs-toggle="modal" data-bs-target="#authModal"><i className="fa-regular fa-user"></i></h4>
                            <h4 className=' btn p-2 fs-5'><i className="fa-solid fa-circle-info"></i></h4>
                            <h4 className=' btn p-2 fs-5' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i className="fa-solid fa-cart-shopping"></i>{cartItems.length>0?<sup className='ms-1 text-primary'>({cartItems.length})</sup>:null}</h4>
                            
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}
