import React, { useState } from 'react'
import restaurantApi from '../apis/restaurantApi';
import {useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';

const AddReview = () => {

  const navigate = useNavigate();
  const {addReview} = useContext(RestaurantContext);

  const [reviewInputData, setReviewInputData] = useState({
    user_name: '',
    review: '',
    rating: 'Rating'
  });

  const {id} = useParams();

  const handleChangeInputs = (event) =>{
    event.preventDefault();
    const {name, value} = event.target;
    setReviewInputData((prev)=>{
      return{
        ...prev,
        [name]: value
      };
    });
  };

  const handleAddReview =async(event) =>{
    event.preventDefault();
    try {
      const response = await restaurantApi.post(`/create-review/${id}`,{
        user_name: reviewInputData.user_name,
        review: reviewInputData.review,
        rating: reviewInputData.rating
      });

    // automatically show the added review to the UI 
      addReview(response.data.review);

      // empty the inputs form just after adding the new one
      setReviewInputData({
        user_name: '',
        review: '',
        rating: 'Rating'
      });
      navigate('/');
      navigate(`/restaurant-page/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <>
    <form action="" onSubmit={handleAddReview}>
      <div className="form-group row">
        <div className="col-8">
          <label htmlFor="user_name" className="col-form-label">User Name</label>
          <input 
            type="text" 
            name="user_name" 
            id="user_name" 
            className="form-control" 
            placeholder='client name...'
            value={reviewInputData.user_name}
            onChange={(event)=>handleChangeInputs(event)}
          />
        </div>
        <div className="col-4">
          <label htmlFor="rating" className="col-form-label">Rating</label>
          <select 
            name="rating" 
            id="rating" 
            className="custom-select"
            value={reviewInputData.rating}
            onChange={(event)=>handleChangeInputs(event)}
          >
            <option disable={"true".toString()} value="Rating"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="review" className="col-form-label">Review</label>
        <textarea 
          name="review" 
          id="review" 
          className="form-control"
          value={reviewInputData.review}
          onChange={(event)=> handleChangeInputs(event)}
        ></textarea>
      </div>
      <button type='submit' className="btn btn-primary lg-btn w-100">Add</button>
    </form>
    </>
  )
}

export default AddReview