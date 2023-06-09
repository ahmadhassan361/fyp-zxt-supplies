import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loader } from './Loader'
import { BASE_URL } from '../utils/Constants'

export const GamesModal = ({selectedImages,setSelectedImages}) => {
    const [loading, setloading] = useState(false)
    const [games, setGames] = useState([])
    async function fetchGames() {
        setloading(true)
        await axios.get(
            BASE_URL+'/api/games/',).then((res) => {
                console.log(res)
                const updatedList = res.data.map(element => {
                    return { ...element, graph: '' };
                  });
                
                setGames(updatedList)

            }).catch((err) => {
                console.log(err)
            })
        setloading(false)
    }
    useEffect(() => {
        fetchGames()
    }, [])

  const toggleImageSelection = (image) => {
    if (selectedImages.length > 3) {
        return
    }
    const isSelected = selectedImages.includes(image);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };
    return (
        <div className="modal fade modal-md" id="games-modal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Select Games</h1>
                        
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row justify-content-center'>
                            {
                              loading?<Loader/>:  games.map((e) => <div key={e.id} className="col-4 p-2 mb-2">
                                    <div className='rounded-2 p-1 shadow ' style={{'height':'100%'}} >
                                        <img src={e.image} style={{'height':'100%'}} alt=""  className={`rounded-2 img-fluid ${selectedImages.includes(e) ? 'selected' : ''}`}
                                        onClick={() => toggleImageSelection(e)}/>
                                    </div>
                                </div>)
                            }

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
