import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import restaurantApi from '../apis/restaurantApi';
import { RestaurantContext } from '../context/RestaurantContext';
import StarRating from './StarRating';


const RestaurantsList = () => {
  const navigate = useNavigate();

  const {restaurants, setRestaurants} = useContext(RestaurantContext);
  useEffect(() => {
    const fetchData =  async ()=> {   
      try {
        const response =await restaurantApi.get('/');
        setRestaurants(prev => prev = response.data.restaurants);
      } catch (error) {
        throw new Error(`an error just occurred due to ${error}`);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDeleteRestaurant = async (event, id) =>{
    event.stopPropagation();
    try {
      // delete a restaurant from database
      await restaurantApi.delete(`/delete-restaurant/${id}`);

      // delete restaurant from UI
      setRestaurants((prev) =>  
        prev.filter((restaurant)=> {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const handleGoToEditPage=(event,id)=>{
    event.stopPropagation();
    navigate(`/update-restaurant/${id}`);
  };

  return (
    <div className='container'>
      <div className="list-group">
        <table className="table table-hover table-light table-striped">
          <thead>
            <tr className='bg-info'>
              <th scope='col'>Restaurant</th>
              <th scope='col'>Location</th>
              <th scope='col'>Price Range</th>
              <th scope='col'>Ratings</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            { restaurants &&
              restaurants.map(restaurant => 
                (
                  <tr
                    role={"button"}
                    onClick={()=>navigate(`/restaurant-page/${restaurant.id}`)} 
                    key={restaurant.id}
                  >
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>
                      {
                        !restaurant.count ? (
                           <span className="text-warning">0 reviews</span>
                        ) :(
                          <>
                            <StarRating 
                              style={{color: 'orange'}} 
                              rating={restaurant.average_rating}
                            />
                            <span className="text-warning ml-1">({restaurant.count})</span>
                          </>
                        )
                      }
                    </td>
                    <td>
                      <button 
                        onClick={(event)=> handleGoToEditPage(event, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                    <button 
                      onClick={(event)=> handleDeleteRestaurant(event, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RestaurantsList