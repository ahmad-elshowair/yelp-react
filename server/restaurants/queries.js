const getRestaurants = 'SELECT * FROM restaurants';
const getRestaurantById = 'SELECT * FROM restaurants WHERE id = ($1)';
const createRestaurant = 'INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) RETURNING *';
const checkRestaurant = "SELECT * FROM restaurants AS r WHERE r.name = ($1) AND r.location = ($2)";
const deleteRestaurant = 'DELETE FROM restaurants WHERE id = ($1) RETURNING *';
const updateRestaurant = 
  'UPDATE restaurants SET name = ($1), location = ($2), price_range = ($3) WHERE id = ($4) RETURNING *';
const getReviews = 'SELECT * FROM reviews WHERE restaurant_id = ($1)';
const createReview = 
  'INSERT INTO reviews (user_name, review, rating, restaurant_id) VALUES($1, $2, $3, $4) RETURNING *';
const getRestaurantsRatingData = 
  'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id';

const getRestaurantDataById = 
'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1'
export default {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  checkRestaurant,
  deleteRestaurant,
  updateRestaurant,
  getReviews,
  createReview,
  getRestaurantsRatingData,
  getRestaurantDataById
};