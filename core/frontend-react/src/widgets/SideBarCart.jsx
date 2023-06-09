import React, { useEffect, useState } from 'react'
import { CartProduct } from './CartProduct'
import { BASE_URL } from '../utils/Constants'

export const SideBarCart = ({cartItems,setCartItems}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(()=>{
        let tempPrice = 0
        cartItems.forEach(e => {
            if(e.hasOwnProperty('case') && e.hasOwnProperty('cpu')){
                tempPrice = tempPrice + parseInt(e.price)
            }else{
                tempPrice = tempPrice + parseInt(e.stock.sale_price)
            }
        });
        setTotalPrice(tempPrice)
    },[cartItems])

    return (
        <div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title" id="offcanvasExampleLabel">Cart</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div className="offcanvas-body">
                    <div className='px-2 text-white'>

                    {
                        cartItems.map((e)=>{
                            if(e.hasOwnProperty('case') && e.hasOwnProperty('cpu') && e?.case !== null){

                                return <div className='w-100 p-1 rounded-2 shadow mb-2 bg-dark d-flex'>
                                <img src={e?.case.image} width={100}  alt="" className='bg-white rounded-2'  />
                                <div className='text-white ms-1 p-2'>
                                    <h6>{e?.case.name}</h6>
                                    <h6 className='small'>type: Custom Build</h6>
                                    <h6>Rs. {e?.price}</h6>
                                </div>
                                <h6 className='ms-auto pe-1 mt-2' onClick={()=>{
                                    const cartList = cartItems.filter(el=>  el?.motherboard?.id !== e?.motherboard?.id)
                                    setCartItems(cartList)
                                }}><i className="fa-solid fa-xmark"></i></h6>
                            </div>
                            }else{


                                return <div className='w-100 p-1 rounded-2 shadow mb-2 bg-dark d-flex'>
                                <img src={BASE_URL+ e?.image} width={100}  alt="" className='bg-white rounded-2'  />
                                <div className='text-white ms-1 p-2'>
                                    <h6>{e?.title.length > 23? e?.title.slice(0,20)+'..':e?.title}</h6>
                                    <h6 className='small'>type: Pre Built</h6>
                                    <h6>Rs. {e?.stock.sale_price}</h6>
                                </div>
                                <h6 className='ms-auto pe-1 mt-2' onClick={()=>{
                                    const cartList = cartItems.filter(el=> el?.id !== e?.id)
                                    setCartItems(cartList)
                                }}><i className="fa-solid fa-xmark"></i></h6>
                            </div>
                            }
                        })
                    }
                    </div>
                    <hr />
                    <div className='p-2 d-flex justify-content-between mb-2'>
                        <h4>Total:</h4>
                        <h4>Rs.{totalPrice}</h4>

                    </div>
                    <button className='btn btn-primary w-100' data-bs-dismiss="offcanvas" aria-label="Close" data-bs-toggle="modal" data-bs-target="#checkmodal">Checkout</button>
                </div>
            </div>
        </div>
    )
}
