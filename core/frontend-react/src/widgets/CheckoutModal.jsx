import React, { useEffect } from 'react'
import Received from '../assets/received.png'
import { useNavigate } from 'react-router-dom'
export const CheckoutModal = () => {
    const navigate = useNavigate()
   
  return (
    <div>
        <div class="modal fade" id="checkmodal" tabindex="-1" aria-labelledby="checkmodal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="checkmodal">Order Received</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <img src={Received} alt="" className='img-fluid w-50' />
        <h3>Order Placed</h3>
        <button className='btn btn-primary w-100'  data-bs-dismiss="modal|offcanvas" aria-label="Close"  onClick={()=>{
            localStorage.removeItem('cart')
            window.location.href = '/'}}>Continue</button>
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
    </div>
  )
}
