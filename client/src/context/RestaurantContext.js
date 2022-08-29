import React, {useState, createContext} from 'react';

export const RestaurantContext = createContext();

export const RestaurantsContextProvider = ({children})=>{
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);

  const addRestaurants = (restaurant)=>{
    setRestaurants(prev => ([...prev, restaurant]));
  }
  const addReview = (review) =>{
    setReviews(prev => ([...prev, review]));
  };

  return(
    <RestaurantContext.Provider value={
        {
          restaurants,
          setRestaurants, 
          addRestaurants, 
          selectedRestaurant, 
          setSelectedRestaurant,
          reviews,
          setReviews,
          addReview
        }
      }
    >
      {children}
    </RestaurantContext.Provider>
  );
};