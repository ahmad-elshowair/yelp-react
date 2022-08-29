
import axios from 'axios';

const deployApi= "https://ahmad-yelp-app.herokuapp.com",
  devApi = "http://localhost:3005/restaurants";
export default axios.create({
  baseURL: devApi
});