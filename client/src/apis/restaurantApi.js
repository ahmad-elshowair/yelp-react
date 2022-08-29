
import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://ahmad-yelp-app.herokuapp.com/restaurants'
});