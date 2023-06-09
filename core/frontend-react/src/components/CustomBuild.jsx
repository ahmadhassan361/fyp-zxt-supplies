import React, { useEffect, useState } from 'react'
import { CartProduct } from '../widgets/CartProduct'
import { PerformanceStats } from '../widgets/PerformanceStats'
import StatImage from '../assets/download.png'
import axios from 'axios'
import { Loader } from '../widgets/Loader'
import { GamesModal } from '../widgets/GamesModal'
import { toast } from 'react-toastify'
import { ErrorToast, SuccessToast } from '../widgets/Toast'
import { BASE_URL } from '../utils/Constants'

export const CustomBuild = ({ selectedImages, setSelectedImages,cartItems,setCartItems }) => {

    const [casings, setCasings] = useState([])
    const [motherboard, setMotherboard] = useState([])
    const [cpu, setCpu] = useState([])
    const [cooling, setCooling] = useState([])

    const [ram, setRam] = useState([])
    const [storage, setStorage] = useState([])
    const [powerSupply, setPowerSupply] = useState([])
    const [gpu, setGPU] = useState([])

    const [casingsSelect, setCasingsSelect] = useState(null)
    const [motherboardSelect, setMotherboardSelect] = useState(null)
    const [cpuSelect, setCpuSelect] = useState(null)
    const [coolingSelect, setCoolingSelect] = useState(null)

    const [ramSelect, setRamSelect] = useState(null)
    const [storageSelect, setStorageSelect] = useState(null)
    const [powerSupplySelect, setPowerSupplySelect] = useState(null)
    const [gpuSelect, setGPUSelect] = useState(null)

    const [selected, setSelected] = useState(3)
    const [caseImageSelected, setcaseImageSelected] = useState(0)
    const [loading, setLoading] = useState(false)
    const [listLoading, setListLoading] = useState(false)
    const [caseImagesList, setCaseImagesList] = useState([])
    const [buildSelection, setBuildSelection] = useState({case:null,cooling:null,motherboard:null,gpu:null,cpu:null,ram:null,storage:null,powerSupply:null,price:0})
    useEffect(() => {
        if (casingsSelect !== null && casingsSelect.image !== '' && casingsSelect.images.length > 0) {
            const images = casingsSelect.images.map(e => e.image)
            const list = [casingsSelect.image, ...images]
            setCaseImagesList(list)
        } else if (casingsSelect !== null && casingsSelect.image !== '') {
            setCaseImagesList([casingsSelect.image])
        }
    }, [casingsSelect])

    function imageLeft() {
        if (caseImageSelected === 0) {
            setcaseImageSelected(caseImagesList.length - 1)
        } else {
            setcaseImageSelected(prev => prev - 1)
        }
    }
    function imageRight() {
        if (caseImageSelected === caseImagesList.length - 1) {
            setcaseImageSelected(0)
        } else {
            setcaseImageSelected(prev => prev + 1)
        }
    }
    useEffect(() => {
        if (motherboardSelect !== null) {
            setGPUSelect(gpu.length > 0 ? gpu[0] : [])
            setCpuSelect(cpu.length > 0 ? cpu[0] : [])
            setRamSelect(ram.length > 0 ? ram[0] : [])
            setPowerSupplySelect(powerSupply.length > 0 ? powerSupply[0] : [])
            setCasingsSelect(casings.length > 0 ? casings[0] : [])
        }
    }, [motherboardSelect])

    useEffect(() => {
        if (selected === 2 && cooling.length < 1) {
            fetchCooler()
        }
        else if (selected === 3 && motherboard.length < 1) {
            fetchMotherboard()
        }
        else if (selected === 8 && storage.length < 1) {
            fetchStorage()
        }
    }, [selected])

    async function fetchCooler() {
        setListLoading(true)
        await axios.get(
            BASE_URL+'/api/cooling/',).then((res) => {
                console.log(res)
                setCooling(res.data)
                setListLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    async function fetchMotherboard() {
        setListLoading(true)
        await axios.get(
            BASE_URL+'/api/motherboard/',).then((res) => {
                console.log(res)
                setMotherboard(res.data)
                console.log(res.data[0]?.casing_comaptible)
                console.log(res.data[0]?.gpu_compatible)
                console.log(res.data[0]?.powersupply_compatible)
                console.log(res.data[0]?.processor_compatible)
                console.log(res.data[0]?.ram_compatible)
                setCasings(res.data[0]?.casing_comaptible)
                setGPU(res.data[0]?.gpu_compatible)
                setPowerSupply(res.data[0]?.powersupply_compatible)
                setCpu(res.data[0]?.processor_compatible)
                setRam(res.data[0]?.ram_compatible)
                setTimeout(() => {

                    setMotherboardSelect(res.data[0])
                }, 1000)
                setListLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }
    async function fetchStorage() {
        setListLoading(true)
        await axios.get(
            BASE_URL+'/api/storagedrive/',).then((res) => {
                console.log(res)
                setStorage(res.data)
                setListLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const [price, setPrice] = useState(0)
    useEffect(() => {
        let priceTemp = 0;
        if (motherboardSelect !== null) {
            priceTemp += parseInt(motherboardSelect?.price)
        }
        if (casingsSelect !== null) {
            priceTemp += parseInt(casingsSelect?.price)
        }
        if (coolingSelect !== null) {
            priceTemp += parseInt(coolingSelect?.price)
        }
        if (ramSelect !== null) {
            priceTemp += parseInt(ramSelect?.price)
        }
        if (cpuSelect !== null) {
            priceTemp += parseInt(cpuSelect?.price)
        }
        if (gpuSelect !== null) {
            priceTemp += parseInt(gpuSelect?.price)
        }
        if (powerSupplySelect !== null) {
            priceTemp += parseInt(powerSupplySelect?.price)
        }
        if (storageSelect !== null) {
            priceTemp += parseInt(storageSelect?.price)
        }
        setPrice(priceTemp)
    }, [motherboardSelect, casingsSelect, coolingSelect, ramSelect, cpuSelect, gpuSelect, powerSupplySelect, storageSelect])

    const [performanceLoading, setPerformanceLoading] = useState(false)

    async function updateBuildPerformanceStats() {
       
      
        const updatedList = selectedImages.map(element => {
            return { ...element, graph: '' };
          });
        
        setSelectedImages(updatedList)
        if (selectedImages.length < 1) {
            ErrorToast('Please Select Games First', 3000)
        } else  if(storageSelect === null){
            ErrorToast('Please Select Storage',5000)
            return
        }else   if (coolingSelect === null) {
            ErrorToast('Please Select Cooling',5000)
            return
        }
        
        else {
            SuccessToast('Performance Calculating Start',2000)
            setPerformanceLoading(true)
            for (let index = 0; index < selectedImages.length; index++) {
                const res = await fetchStorageDrive(selectedImages[index].game_debate_name)
                console.log(res)
                if (res !== null) {
                    if (res.data?.status && res.data?.ouput !== '') {
                        console.log(selectedImages)
                        // selectedImages[index].graph = res.data.output
                        const updatedList = [...selectedImages]; // Make a copy of the list
                        updatedList[index].graph = res.data.output // Add new attribute
                        SuccessToast(`Calculating For ${selectedImages[index].name} Complete`,2000)

                        setSelectedImages(updatedList);
                    }
                } else {

                }
            }
            setPerformanceLoading(false)

        }
    }
    async function fetchStorageDrive(game) {
        try {
            const formData = new FormData();
            formData.append('game', game);
            formData.append('cpu', cpuSelect?.model);
            formData.append('gpu', gpuSelect?.model);
            formData.append('ram', ramSelect?.model);
            const res = await axios.post(
                'http://127.0.0.1:8000/api/scrape/', formData)
            return res
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

    const handleStoreBuild = () => {
        if(storageSelect === null){
            ErrorToast('Please Select Storage',5000)
            return
        }
        if (coolingSelect === null) {
            ErrorToast('Please Select Cooling',5000)
            return
        }
        // setBuildSelection(
        //     {
        //         case:casingsSelect,
        //         cooling:coolingSelect,
        //         motherboard:motherboardSelect,
        //         gpu:gpuSelect,
        //         cpu:cpuSelect,
        //         ram:ramSelect,
        //         storage:storageSelect,
        //         powerSupply:powerSupplySelect,
        //         price:price
        //     }
        // )
        const cartList = [...cartItems,{
            case:casingsSelect,
            cooling:coolingSelect,
            motherboard:motherboardSelect,
            gpu:gpuSelect,
            cpu:cpuSelect,
            ram:ramSelect,
            storage:storageSelect,
            powerSupply:powerSupplySelect,
            price:price
        }]
        setCartItems(cartList)
        SuccessToast('Your build added to the cart',5000)
    }


    return (
        <>
            <div className='container-fluid bg-dark text-white pb-4'>
                {/* <GamesModal/> */}
                <div className="row  " style={{'height':'80dvh'}}>
                    <div className="col-md-9 mt-3">
                        <div className='d-flex justify-content-between mb-2'>
                            <h2 className='fw-bolder'>{casingsSelect?.name} Build</h2>
                            <h2>Total: Rs.{price}</h2>
                        </div>
                        <div className="row">
                            <div className="col-6 d-flex align-items-center justify-content-between mx-auto">
                                <h5 onClick={imageLeft}><i className="fa-solid fa-chevron-left"></i></h5>
                                <img className='img-fluid w-75 rounded-2' style={{ 'height': '100%' }} src={caseImagesList.length > 0 ? caseImagesList[caseImageSelected] : casingsSelect !== null && casingsSelect.image !== '' ? casingsSelect?.image : 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2hpdGV8ZW58MHx8MHx8&w=1000&q=80'} alt="" />
                                <h5 onClick={imageRight}><i className="fa-solid fa-chevron-right"></i></h5>
                            </div>
                            <div className="col-6 mt-auto    mx-auto ">
                                <h6 className='px-1'>Note: Casing,GPU,CPU,ram & powerSupply depends on motherboard</h6>
                                <div className="row gx-0 mt-auto">
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 1 ? 'border border-3' : ''}`} onClick={() => setSelected(1)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${casingsSelect?.image !== '' ? casingsSelect?.image : ''}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Case</h5>
                                                <h6>{casingsSelect?.name} Case</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>

                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 2 ? 'border border-3' : ''}`} onClick={() => setSelected(2)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${coolingSelect !== null ? coolingSelect?.image : 'https://zahcomputers.pk/wp-content/uploads/2022/06/ID-COOLING-SE-224-XT-Black-CPU-Cooler-4-Heatpipes-CPU-Air-Cooler-Price-in-Pakistan-.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Cooling</h5>
                                                <h6>{coolingSelect === null ? 'Please Select' : coolingSelect?.name}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>
                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 3 ? 'border border-3' : ''}`} onClick={() => setSelected(3)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${motherboardSelect !== null ? motherboardSelect?.image : 'https://easyskinsinc.com/wp-content/uploads/2021/08/71DWNSViSlL._AC_SL1080_.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Motherboard</h5>
                                                <h6>{motherboardSelect !== null ? motherboardSelect?.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>

                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 4 ? 'border border-3' : ''}`} onClick={() => setSelected(4)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${gpuSelect !== null ? gpuSelect?.image : 'https://www.nexgenshop.pk/wp-content/uploads/2021/11/1.-ROG-STRIX-RTX3070TI-O8G-GAMING-1.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>GPU</h5>
                                                <h6>{gpuSelect !== null ? gpuSelect?.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>
                                    </div>
                                    <div className="col-6 p-1 mb-2 ">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 5 ? 'border border-3' : ''}`} onClick={() => setSelected(5)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${cpuSelect !== null ? cpuSelect?.image : 'https://www.proshop.dk/Images/915x900/2924542_0e254ecf77cd.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>CPU</h5>
                                                <h6>{cpuSelect !== null ? cpuSelect?.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>

                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 6 ? 'border border-3' : ''}`} onClick={() => setSelected(6)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${powerSupplySelect !== null ? powerSupplySelect?.image : 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/R2011837-01'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Power Supply</h5>
                                                <h6>{powerSupplySelect !== null ? powerSupplySelect?.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>
                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 7 ? 'border border-3' : ''}`} onClick={() => setSelected(7)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${ramSelect !== null ? ramSelect?.image : 'https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Ram</h5>
                                                <h6>{ramSelect !== null ? ramSelect.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>

                                    </div>
                                    <div className="col-6 p-1 mb-2">
                                        <div className={`rounded-3 shadow bg-main d-flex p-1 ${selected === 8 ? 'border border-3' : ''}`} onClick={() => setSelected(8)}>
                                            <img height={80} width={80} className='rounded-3 bg-white' src={`${storageSelect !== null ? storageSelect?.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Super_Talent_2.5in_SATA_SSD_SAM64GM25S.jpg'}`} alt="" />
                                            <div className='ms-2 justify-content-center w-100' style={{ display: 'flex', 'flexDirection': 'column' }}>
                                                <h5 className='fw-bold'>Storage</h5>
                                                <h6>{storageSelect !== null ? storageSelect.name : 'Please Select'}</h6>
                                            </div>
                                            <h6 className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <button className='btn btn-primary py-1 fw-bold w-100 me-2' data-bs-toggle="modal" data-bs-target="#games-modal">{selectedImages.length > 0 ? `${selectedImages.length} Games Selected` : 'Select Games'}</button>

                                    <button className='btn btn-success  py-2 mt-auto fw-bold mx-0 w-100' onClick={updateBuildPerformanceStats} >Update Build & Create Performance Stats</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3  ps-1" style={{'display':'flex','flexDirection':'column'}}>
                        <div className='d-flex bg-dark w-100  text-light'>
                            <h5 className='w-100 p-1 btn btn-primary rounded-0 py-3'>01 Base</h5>
                            <h5 className='w-100 p-1 btn btn-dark rounded-0 py-3'>02 Addons</h5>
                            <h5 className='w-100 p-1 btn btn-dark rounded-0 py-3'>03 Summary</h5>
                        </div>
                        <div className='bg-main-dark shadow mb-2' style={{'flexGrow':'1'}}>
                            <div className=' p-2 ' style={{ height: '100%', 'overflowY': 'auto' }}>
                                {
                                    selected === 1 ?
                                        <>
                                            {
                                                listLoading && casings.length < 1 ? <Loader /> : casings.length > 0 ? casings.map((e) => <CartProduct key={e.id} data={e} setProduct={setCasingsSelect} selected={casingsSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 2 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : cooling.length > 0 ? cooling.map((e) => <CartProduct key={e.id} data={e} setProduct={setCoolingSelect} selected={coolingSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 3 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : motherboard.length > 0 ? motherboard.map((e) => <CartProduct key={e.id} data={e} setProduct={setMotherboardSelect} selected={motherboardSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 4 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : gpu.length > 0 ? gpu.map((e) => <CartProduct key={e.id} data={e} setProduct={setGPUSelect} selected={gpuSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 5 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : cpu.length > 0 ? cpu.map((e) => <CartProduct key={e.id} data={e} setProduct={setCpuSelect} selected={cpuSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 6 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : powerSupply.length > 0 ? powerSupply.map((e) => <CartProduct key={e.id} data={e} setProduct={setPowerSupplySelect} selected={powerSupplySelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 7 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : ram.length > 0 ? ram.map((e) => <CartProduct key={e.id} data={e} setProduct={setRamSelect} selected={ramSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }
                                {
                                    selected === 8 ?
                                        <>
                                            {
                                                listLoading ? <Loader /> : storage.length > 0 ? storage.map((e) => <CartProduct key={e.id} data={e} setProduct={setStorageSelect} selected={storageSelect} />) : <h6 className="text-center">No Items</h6>
                                            }
                                        </> : null
                                }


                            </div>
                            <hr className='m-0' />
                            <div style={{ 'height': '50px' }} className='d-flex justify-content-between align-items-center p-2'>
                                <h4 className='m-0'>Total</h4>
                                <h4 className='m-0'>PKR {price}</h4>
                            </div>
                        </div>

                        <button className='btn btn-primary w-100 mt-1 py-3 fw-bold' onClick={handleStoreBuild}>Add To Cart</button>
                    </div>
                </div>
                <div>
                    <div className='row mt-5 px-5'>
                    <h6 className='w-100 py-3 col-12'>Note! Performance engine can take upto 30 seconds calculting for single game, Please be patient</h6>
                    {
                       selectedImages.map((e) =>
                            <div className="col-md-6 p-2 mb-3 text-center" key={e.id}>
                                    <div className='text-center bg-main shadow rounded p-2 ' style={{ 'minHeight': '300px' }}>
                                    <h1>{e.name}</h1>

                                {e?.graph !== '' ? <img src={BASE_URL+e.graph} className='img-fluid rounded-2 mt-2 w-100' alt=""  /> : <Loader className={'mt-5'} />}

                            </div>
                            </div>

                        )
                    }


                </div>
                </div>
                

            </div>
        </>
    )
}
