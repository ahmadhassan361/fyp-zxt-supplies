import React from 'react'

export const Loader = ({type,className}) => {
  return (
   <div className={`spinner-border text-${type} ${className}`} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  )
}
