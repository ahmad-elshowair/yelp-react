import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantApi from '../apis/restaurantApi';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate =useNavigate();
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    location: '',
    price_range: 0
  });

  useEffect(() => {
   const fetchData=async ()=>{
    try {
      const response = await restaurantApi.get(`/get-restaurant/${id}`);
      setUpdateFormData(prev =>{
        return{
          name: response.data.restaurant.name,
          location: response.data.restaurant.location,
          price_range: response.data.restaurant.price_range
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
   };
   fetchData();
  }, [id]);
  
  const handleChangeData = (event)=>{
    const {name, value} = event.target;
    setUpdateFormData(prev =>{
      return{
        ...prev,
        [name] : value
      };
    });
  };

  const handleSaveUpdatedData =async(event)=>{
    event.preventDefault();
    await restaurantApi.put(`/update-restaurant/${id}`,{
      name: updateFormData.name,
      location: updateFormData.location,
      price_range: updateFormData.price_range
    });
    navigate('/');
  };

  document.title = updateFormData.name;
  return (
    <div className="mt-4">  
      <div className='container'>
        <h2 className='text-center'>Update Restaurant</h2>
        <form action="" className='mt-5'>
          <div className="form-group row mb-3">
            <label htmlFor="name" className="col-2 col-form-label">Name</label>
            <div className="col-10">
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="form-control"
                value={updateFormData.name}
                onChange={(event)=> handleChangeData(event)}
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="location" className="col-2 col-form-label">Location</label>
            <div className="col-10">
              <input 
                type="text" 
                name="location" 
                id="location" 
                className="form-control"
                value={updateFormData.location}
                onChange={(event)=> handleChangeData(event)}
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="price_range" className="col-2 col-form-label">Price Range</label>
            <div className="col-10">
            <input 
                type="text" 
                name="price_range" 
                id="price_range" 
                className="form-control"
                value={updateFormData.price_range}
                onChange={(event)=> handleChangeData(event)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button 
                onClick={handleSaveUpdatedData}
                className="btn btn-success btn-lg w-100"
                type='submit'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default UpdateRestaurant