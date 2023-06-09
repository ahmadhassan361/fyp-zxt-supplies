import React, { useEffect, useState } from 'react'
import { PerformanceStats } from '../widgets/PerformanceStats'
import StatImage from '../assets/download.png'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import { ErrorToast, SuccessToast } from '../widgets/Toast'

export const ProductView = ({cartItems,setCartItems}) => {
    const { id } = useParams()
    useEffect(() => {
        console.log(id)
        fetchProduct()
    }, [])
    const [data, setData] = useState(null)
    const [image, setImage] = useState('')
    const fetchProduct = async () => {
        await axios.get(
            BASE_URL + '/api/get-product/?id=' + id,).then((res) => {
                console.log(res)
                setData(res.data)
                setImage(res.data?.image)
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-4">
                    <img src={BASE_URL + image} className='img-fluid' height={300} alt="" srcset="" />
                    <div className='d-flex mt-2'>
                        <img src={BASE_URL+ data?.image} width={100} onClick={()=>setImage(data?.image)} height={100} alt="" className='border me-1' srcset="" />
                        {
                            data?.images.map((e) =>
                                <img src={BASE_URL+ e.image} key={e.id} width={100} onClick={()=>setImage(e.image)} height={100} alt="" className='border me-1' srcset="" />

                            )
                        }

                    </div>
                </div>
                <div className='col-md-5'>
                    <h3 className='fw-bold text-primary'>{data?.title}</h3>
                    <p className='small text-secondary m-0 mb-1'>Product Code: <span className='text-dark'>{id}</span></p>
                    <p className='small text-secondary m-0 mb-1'>Brand: <span className='text-dark'>{data?.brand}</span></p>
                    <p className='small text-secondary m-0 mb-1'>Price Updated On: <span className='text-dark'>6 May 2023</span></p>
                    <p className='small text-dark m-0 mt-2 mb-1'>{data?.subtitle}</p>
                    <ul>
                        <li>Intel i7 11400 Octa Core</li>
                        <li>GTX 3080ti 8GB</li>
                        <li>16GB DDR4 3200 MHz</li>
                        <li>144 Hz, 17 Inches IPS LCD </li>
                    </ul>
                    <p className='fw-bold m-0 mt-2 mb-1 text-danger'>View details on manufacturer's website</p>
                    <hr />
                    <div className='d-flex'>
                        <button className='btn shadow btn-primary '>Add To Compare</button>
                        <button className='btn shadow btn-primary ms-2 '>Price Alert</button>

                    </div>
                </div>
                <div className="col-md-3 ">
                    <div className='border p-2'>

                        <h2 className='' style={{ 'color': '#15C308' }}>{data?.stock.quantity > 0?'In Stock':'Out Of Stock'}</h2>
                        <p className='m-0 text-primary'>Warranty: <span className='fw-bold'>1- Year Official Warranty</span></p>
                        <button className='btn btn-warning fw-bold mt-2 w-100 shadow' onClick={()=>{
                            let flag = false
                            cartItems.forEach(element => {
                                if(!element.hasOwnProperty('case') && !element.hasOwnProperty('cpu'))
                                {

                                    if(element?.id.toString() === id.toString()){
                                        flag = true
                                    }
                                }    
                                
                                
                            })
                           if(flag){
                            ErrorToast('item already in cart',2000)
                           }else{
                            const cartList = [...cartItems,data]
                            setCartItems(cartList)
                            SuccessToast('Item Added in Cart',3000)
                           }
                        }}> <i className="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                        <h1 className='fw-bolder text-dark mt-2'>Rs.{data?.stock.sale_price}</h1>
                    </div>
                </div>
            </div>
            <h1 className='text-center mt-5'>Gaming Performance Stats</h1>
            <div className='row'>
                {data?.stats.map((e) => <div key={e.id} className="col-md-6 p-2 my-3 ">
                    <div className='shadow p-2'>
                    <h3>{e.game.name}</h3>
                    <PerformanceStats game={'Call Of Duty: Warzone'} image={StatImage} />
                    </div>
                </div>)}

            </div>
        </div>
    )
}
