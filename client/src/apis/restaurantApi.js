
import axios from 'axios';

// const deployApi= "https://ahmad-yelp-app.herokuapp.com/restaurantts",
const devApi = "http://localhost:3005/restaurants";
export default axios.create({
  baseURL: devApi
});