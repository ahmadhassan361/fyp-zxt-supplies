import React, { useEffect, useState } from 'react'
import { Product } from '../widgets/Product'
import Custom1 from '../assets/custom1.jpg'
import Custom2 from '../assets/custom2.jpeg'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [loading, setloading] = useState(false)
  const [Products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    fetchProducts()
  }, [])
  async function fetchProducts() {
    setloading(true)
    await axios.get(
      BASE_URL+'/api/products/',).then((res) => {
        console.log(res)
        const data = [...Products, ...res.data]
        setProducts(data)
        setloading(false)
      }).catch((err) => {
        console.log(err)
      })
  }



  return (
    <div>
      <img src="https://www.datocms-assets.com/34299/1681863090-kraken-and-kraken-elite-hero-bg-2xl.png?auto=format&ixlib=react-9.7.0&w=2716&dpr=2&q=50" className='img-fluid ' alt="" srcset="" />

      <div className="container-fluid px-0">
        
        <div className='mt-5 text-center'>
        
          <h1 className='text-dark text-center fw-bolder'>Gaming Paradise</h1>
          <p className='w-50 mx-auto'>Want to build extreme Gaming PC's, Who can run all AAA titles with Streaming. Use our Custom Build Tool To Design Your Own PC</p>
          <img src={Custom1} className='w-100 img-fluid btn' onClick={()=>navigate('/custom-build')} alt="" srcset="" />
        </div>
        <div className='text-center mt-5'>

          <h1 className='text-dark text-center fw-bolder'>All Players Welcome</h1>
          <p className='w-50 mx-auto'>No matter what you play, the prebuilt Player PCs have you covered. Get connected to friends and jump into a lobby with the Player: One PC. Take your performance up a notch with the Player: Two PC. Or get supercharged performance and show-stopping visuals with the Player: Three PC.</p>
        </div>
        <div className='row justify-content-center'>
          {
            loading ?
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> : <>
                {
                  Products?.map((e) => <Product key={e.id} data={e} />)
                }
              </>
          }

        </div>
        <img src={Custom2} className='w-100 img-fluid btn' alt="" srcset="" />


      </div>

      
    </div>
  )
}
