import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantApi from '../apis/restaurantApi';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate =useNavigate();
  const [updateFormData, setUpdateFormData] = useState({
    restaurant_name: '',
    restaurant_location: '',
    price_range: 0
  });

  useEffect(() => {
   const fetchData=async ()=>{
    try {
      const response = await restaurantApi.get(`/get-restaurant/${id}`);
      setUpdateFormData(prev =>{
        return{
          restaurant_name: response.data.restaurant.restaurant_name,
          restaurant_location: response.data.restaurant.restaurant_location,
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
      restaurant_name: updateFormData.restaurant_name,
      restaurant_location: updateFormData.restaurant_location,
      price_range: updateFormData.price_range
    });
    navigate('/');
  };

  document.title = updateFormData.restaurant_name;
  return (
    <div className="mt-4">  
      <div className='container'>
        <h2 className='text-center'>Update {updateFormData.restaurant_name}</h2>
        <form action="" className='mt-5'>
          <div className="form-group row mb-3">
            <label htmlFor="restaurant_name" className="col-2 col-form-label">Restaurant Name</label>
            <div className="col-10">
              <input 
                type="text" 
                name="restaurant_name" 
                id="restaurant_name" 
                className="form-control"
                value={updateFormData.restaurant_name}
                onChange={(event)=> handleChangeData(event)}
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="restaurant_location" className="col-2 col-form-label">Restaurant Location</label>
            <div className="col-10">
              <input 
                type="text" 
                name="restaurant_location" 
                id="restaurant_location" 
                className="form-control"
                value={updateFormData.restaurant_location}
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