import { useEffect, useState } from "react";
import { CustomBuild } from "./components/CustomBuild";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProductView } from "./components/ProductView";
import { AuthModal } from "./widgets/AuthModal";
import { GamesModal } from "./widgets/GamesModal";
import { SideBarCart } from "./widgets/SideBarCart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CheckoutModal } from "./widgets/CheckoutModal";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [cartItems, setCartItems] = useState(localStorage.getItem('cart') !== null? JSON.parse(localStorage.getItem('cart')):[])
  useEffect(()=>{
    
    localStorage.setItem('cart',JSON.stringify(cartItems))

  },[cartItems])

  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout selectedImages={selectedImages} setSelectedImages={setSelectedImages} cartItems={cartItems} setCartItems={setCartItems} />}>

            <Route index element={<Home />} />
            <Route path="/product-details/:id" element={<ProductView cartItems={cartItems} setCartItems={setCartItems}  />} />
            <Route path="/custom-build" element={<CustomBuild selectedImages={selectedImages} setSelectedImages={setSelectedImages} cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Home/> */}
      {/* <ProductView/> */}
    </>
  );
}

const NoPage = () => {
  return (
    <div className="text-center">
      <h1 className="mt-5">Page Not Found</h1>
    </div>
  )
}

export const Layout = ({ selectedImages, setSelectedImages, cartItems, setCartItems }) => {
  return (
    <>
      <ToastContainer />
      <CheckoutModal/>
      <AuthModal />
      <GamesModal selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      <Header cartItems={cartItems} setCartItems={setCartItems} />
      <SideBarCart cartItems={cartItems} setCartItems={setCartItems} />

      <Outlet />
      <Footer/>
      
    </>
  )
}

export const Footer = () => {
  return (
    <div className="mt-5 py-2 text-center bg-dark text-white">
      <h6>Copyright 2020-2023 by ZXT Supplies. All Rights Reserved.</h6>
    </div>
  )
}


export default App;
