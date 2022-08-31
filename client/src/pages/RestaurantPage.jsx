import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import restaurantApi from '../apis/restaurantApi';
import AddReview from '../components/AddReview';
import Review from '../components/Review';
import { RestaurantContext } from '../context/RestaurantContext';

const RestaurantPage = () => {
  
  const {id} = useParams();
  const {selectedRestaurant, reviews, setReviews, setSelectedRestaurant} = useContext(RestaurantContext);


  useEffect(() => {
  
    // fetch a 
    const fetchData = async()=>{
      try {
        const response = await restaurantApi.get(`/get-restaurant/${id}`);
        setSelectedRestaurant(prev => prev = response.data.restaurant);
        setReviews(prev => prev = response.data.reviews);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [setSelectedRestaurant, setReviews, id]);
  
  document.title=`${selectedRestaurant.restaurant_name} Page`;

  return (
    <section className="restaurant-page">
      <div className="container">
        <header>
          <h1 className='text-center'>{selectedRestaurant && selectedRestaurant.restaurant_name}</h1>
        </header>
        <div className="mt-3">
          <Review reviews={reviews}/>
        </div>
        <div className="mt-3">
          <AddReview/>
        </div>
      </div>
    </section>
  )
}

export default RestaurantPage