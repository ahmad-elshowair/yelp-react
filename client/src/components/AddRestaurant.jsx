import React, { useContext, useState } from 'react'
import restaurantApi from '../apis/restaurantApi';
import { RestaurantContext } from '../context/RestaurantContext';
const AddRestaurant = () => {

  const {addRestaurants} = useContext(RestaurantContext);
  const [dataForm, setDataForm] = useState({
    restaurant_name: '',
    restaurant_location: '',
    price_range: "price range"
  });


  const handleChangingRestaurantInputs = (event) =>{
    event.preventDefault();
    const {name, value} = event.target;
    setDataForm((prev)=>{
      return{
        ...prev,
        [name]: value
      };
    });
  };
  const handleAddRestaurant = async(event) =>{
    event.preventDefault();
    try {
      const response = await restaurantApi.post('/create-restaurant', {
        restaurant_name: dataForm.restaurant_name,
        restaurant_location: dataForm.restaurant_location,
        price_range: dataForm.price_range
       });

       // auto show the added restaurant to list
       addRestaurants(response.data.restaurant);

       // empty the inputs 
       setDataForm({
        restaurant_name: '',
        restaurant_location: '',
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
                name="restaurant_name" 
                id="restaurant_name"
                value={dataForm.restaurant_name}
                onChange={(event) => handleChangingRestaurantInputs(event)}
                className="form-control" 
                placeholder='restaurant name...'
              />
            </div>
            <div className="col">
              <input 
                type="text" 
                name="restaurant_location" 
                id="restaurant_location" 
                value={dataForm.restaurant_location}
                onChange={(event) => handleChangingRestaurantInputs(event)}
                className="form-control" 
                placeholder='restaurant location...'
              />
            </div>
            <div className="col">
              <select 
                name="price_range" 
                id="price_range" 
                value={dataForm.price_range}
                onChange={(event) => handleChangingRestaurantInputs(event)} 
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