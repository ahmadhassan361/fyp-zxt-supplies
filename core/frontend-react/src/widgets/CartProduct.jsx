
import React from 'react'

export const CartProduct = ({data,setProduct,selected}) => {
  return (
    <div className={`d-flex mb-3 shadow p-2 ${selected !== null ? selected?.id===data.id?'border border-2':'':'' }`} onClick={()=>setProduct(data)}>
    <div className='rounded-3  me-3'>
    <img src={data.image} width={100}  alt="" className='bg-white rounded-2' />
    </div>
    <div className='pt-1'>
    <h5 className='text-primary fw-bold'>{data.name}</h5>
    <h6>Model: {data.model} <span className='fw-bold'>Prebuilt</span></h6>
    <h5>PKR {data.price}</h5>
    </div>
    {/* <h6 className='ms-auto'><i className="fa-solid fa-xmark"></i></h6> */}
</div>
  )
}
