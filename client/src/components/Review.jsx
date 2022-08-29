import React from 'react'
import StarRating from './StarRating'

const Review = ({reviews}) => {

  return (
    <div className='row row-cols-3 mb-2 mt-5 justify-content-center'>
      {
        reviews.map((review)=>(
          <div key={review.review_id} className="card text-white bg-primary mb-3 mr-3" style={{maxWidth: "30%"}}>
            <div className="card-header d-flex justify-content-between">
              <h4>{review.user_name}</h4>
              <h4><StarRating rating={review.rating} style={{fontSize: "14px", color: "orange"}}/></h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                {review.review}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Review