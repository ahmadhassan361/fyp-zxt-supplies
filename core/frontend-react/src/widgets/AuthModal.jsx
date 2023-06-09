import React, { useRef, useState } from 'react'
import Google from '../assets/google.png'
import axios, { Axios } from 'axios'
import { Loader } from './Loader'
import { BASE_URL } from '../utils/Constants'
import { ErrorToast, SuccessToast } from './Toast'
import { useNavigate } from 'react-router-dom'
export const AuthModal = () => {
    const [create, setCreate] = useState(false)
    const [email, setEmail] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const modalRef = useRef(null);

    const handleLogin = async () =>{
        if(loginEmail !== '' && loginEmail.length > 4 && loginPassword !== ''){
            setLoading(true)
            await axios.post(
                BASE_URL+'/api/login/',
                {
                    username:loginEmail,
                    password:loginPassword
            }).then((res)=>{
                setLoading(false)
                console.log(res)
                localStorage.setItem('data',JSON.stringify(res))
                SuccessToast('Welcome Back',2000)
                hideModal()
                navigate('/')
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            return;
        }
       
    }
    const handleRegister = async () =>{
        if(username !== '' && username.length > 4 && email.includes('@') && email.includes('.') && password.length >7){
            setLoading(true)
            await axios.post(
                BASE_URL+'/api/register/',
                 {
                     username:username,
                     email:email,
                     password:password
     
             }).then((res)=>{
                 console.log(res)
                 setLoading(false)
                 setCreate(true)
                 SuccessToast('Account Created! Please Login',4000)
             }).catch((err)=>{

                 console.log(err)
             })
        }else{
            ErrorToast('Invalid details')
            return;
        }
    }
    const hideModal = () => {
        modalRef.current?.setAttribute('data-bs-dismiss', 'modal');
        modalRef.current?.setAttribute('aria-label', 'Close');
        modalRef.current.click(); 
      };
    return (


        <div className="modal fade modal-lg" id="authModal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" >
                        <h1 className="modal-title fs-4 fw-bolder text-center" id="exampleModalLabel">ZXT Supplies</h1>
                                <form className={`w-50 mx-auto pb-5 ${create? 'd-block':'d-none'}`}>
                                    <button className='btn btn-light shadow w-100 mt-5'> <img src={Google} width={24} alt=""  /> Sign in with Google</button>
                                    <hr className='my-4' />
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control"  value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label    className="form-label">Password</label>
                                        <input type="password" className="form-control"  value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                                    </div>
                                    <div className="d-flex my-2 justify-content-between">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" >Remember me</label>
                                        </div>
                                        <h6 className='text-primary'>forget password?</h6>
                                    </div>
                                    <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>{loading? <Loader type={'light'}/>:'Sing In'}</button>
                                    <h6 className='text-center mt-5'>Not a member? <span className='text-primary' onClick={() => setCreate(false)}>Create Account</span></h6>
                                </form> 
                                <form className={`w-50 mx-auto pb-5 ${create? 'd-none':'d-block'}`}>
                                    <button className='btn btn-light shadow w-100 mt-5'> <img src={Google} width={24} alt="" /> Sign in with Google</button>
                                    <hr className='my-4' />
                                    <div className="mb-3">
                                        <label  className="form-label">Username</label>
                                        <input type="text" className="form-control"  value={username} onChange={(e)=>setUsername(e.target.value)}  id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Email address</label>
                                        <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}  id="exampleInputEmail121" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Password</label>
                                        <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)}  id="exampleInputPassword1" />
                                    </div>

                                    <button type='button' onClick={()=>handleRegister()} className="btn btn-primary w-100">{loading? <Loader type={'light'}/>:'Sing Up'}</button>
                                    <h6 className='text-center mt-5'>Already have an account? <span className='text-primary' onClick={()=>setCreate(true)}>Sing In</span></h6>
                                </form>

                    </div>

                </div>
            </div>
        </div>
    )
}
