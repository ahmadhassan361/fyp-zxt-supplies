import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Product = ({data}) => {
  const navigate = useNavigate()
  console.log(data)
  console.log(data.image)
  return (
    <div className='col-md-4 col-sm-6 col-12  mb-5 px-2'>
        <div className='rounded rounded-2 shadow px-3 py-3'>
        <img src={data.image} height={400} className='' alt='' />
        <h5 className='text-primary fw-bold'>{data.title}</h5>
        <p>{data.subtitle}</p>
        <button className='btn btn-primary w-100 mt-5' onClick={()=>navigate(`/product-details/${data.id}`)} >Shop</button>
        </div>
    </div>
  )
}
