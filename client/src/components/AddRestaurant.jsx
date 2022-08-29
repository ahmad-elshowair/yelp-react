import React, { useContext, useState } from 'react'
import restaurantApi from '../apis/restaurantApi';
import { RestaurantContext } from '../context/RestaurantContext';
const AddRestaurant = () => {

  const {addRestaurants} = useContext(RestaurantContext);
  const [dataForm, setDataForm] = useState({
    name: '',
    location: '',
    price_range: "price range"
  });

  const handleAddRestaurant = async(event) =>{
    event.preventDefault();
    try {
      const response = await restaurantApi.post('/create-restaurant', {
        name: dataForm.name,
        location: dataForm.location,
        price_range: dataForm.price_range
       });

       // auto show the added restaurant to list
       addRestaurants(response.data.restaurant);

       // empty the inputs 
       setDataForm({
        name: '',
        location: '',
        price_range: "price range"
       });
    } catch (error) {
      throw new Error(error);
    }
  };


  return (
    <div className='mb-4'>
      <form action="" className='w-100' onSubmit={handleAddRestaurant}>
        <div className="container">
          <div className="form-row w-100 align-items-center">
            <div className="col">
              <input 
                type="text" 
                name="name" 
                id="name"
                value={dataForm.name}
                onChange={(event) => setDataForm(prev => ({...prev, name: event.target.value}))}
                className="form-control" 
                placeholder='restaurant name...'
              />
            </div>
            <div className="col">
              <input 
                type="text" 
                name="location" 
                id="location" 
                value={dataForm.location}
                onChange={(event) => setDataForm(prev => ({...prev, location: event.target.value}))}
                className="form-control" 
                placeholder='restaurant location...'
              />
            </div>
            <div className="col">
              <select 
                name="price_range" 
                id="price_range" 
                value={dataForm.price_range}
                onChange={(event) => setDataForm(prev => ({...prev, price_range: event.target.value}))} 
                className="custom-select my-1 mr-sm-2"
              >
                <option disabled={true} value="price range">price range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant