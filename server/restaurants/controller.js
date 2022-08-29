import pool from "../database/pool.js";
import queries from "./queries.js";

// get all  listed restaurants
const getRestaurants = async(req, res) =>{
  try {
    const connection = await pool.connect();
    connection.query(queries.getRestaurantsRatingData, (error, results) => {
      if (error){
        throw new Error(error);
      }
      res.status(200).json({
        restaurants: results.rows
      });
    });
    connection.release();
  } catch (error) {
    throw new Error(`can't get all listed restaurants due to: ${error}`);
  }
};

// get a restaurant
const getRestaurantById = async(req, res) =>{
  try {
    const connection = await pool.connect();
    const {id} = req.params;
    const restaurant = await connection.query(queries.getRestaurantDataById, [id]);
    const reviews = await connection.query(queries.getReviews, [id]);
      if(restaurant.rows.length < 1){
        res.status(200).json({
          message: `the restaurant of id ${id} is not exist in the database`
        }); 
      }else{
        res.status(200).json({
          restaurant: restaurant.rows[0],
          reviews: reviews.rows
        });
      }
    connection.release();
  } catch (error) {
    throw new Error(`can't get a listed restaurant due to: ${error}`);
  }
};

const createRestaurant = async(req, res)=>{
  try {
    const { name, location, price_range } = req.body;
    const connection = await pool.connect();

    connection.query(queries.checkRestaurant, [name, location], (error,results)=>{
      if (error){
        throw new Error(error);
      }

      if(results.rows.length){
        res.status(200).json({
          message: `${name} restaurant is already exist in ${location}`
        });
      }else{
        connection.query(queries.createRestaurant, [name, location, price_range], (error, results)=>{
          if (error) {
            throw new Error(error);
          }
  
          res.status(201).json({
            message: 'a new restaurant has just added',
            restaurant: results.rows[0]
          });
        });
      }
    });
    connection.release();
  } catch (error) {
    throw new Error(`can't add a new restaurant due to: ${error}`);
  }
};

const updateRestaurant = async(req, res)=>{
  try {
    const {id} = req.params;
    const {name, location, price_range} = req.body;
    const connection = await pool.connect();
    // check existing of a restaurant
    connection.query(queries.getRestaurantById, [id], (error, results)=>{
      if (error) {
        throw new Error(error);
      }
      // if exist update it
      if (results.rows.length) {
        connection.query(
          queries.updateRestaurant, 
          [name, location, price_range, id], 
          (error, results)=>{
            if (error) {
              throw new Error(error);
            }
            res.json({
              message: `the restaurant of ${id} has successfully updated !`,
              restaurant: results.rows[0]
            });
        });
      } else {
        res.json({
          message: `the restaurant of ${id} is not exist in the database`
        });
      }
    });
    connection.release();
  } catch (error) {
    throw new Error(`can't update a restaurant due to: ${error}`);
  }
};

const deleteRestaurant = async(req, res)=>{
  try {
    const {id} = req.params;
    const connection = await pool.connect(); 
    connection.query(queries.getRestaurantById, [id], (error, results)=>{
      if(error){
        throw new Error(error);
      }
      if (results.rows.length) {
        connection.query(queries.deleteRestaurant, [id], (error, results)=>{
          if (error) {
            throw new Error(error);
          }
          res.status(200).json({
            message: `the restaurant with id ${id} has successfully deleted !`
          });
        });
        
      } else {
        res.status(200).json({
          message: `the restaurant with an id of ${id} not exist`
        });
      }
    }); 
    connection.release();
  } catch (error) {
    throw new Error(`can't delete a restaurant due to: ${error}`);
  
  } 
}; 

const createReview = async(req, res) =>{
  try {
    const {user_name, review, rating} = req.body;
    const {id} = req.params;
    const connection = await pool.connect();
    connection.query(
      queries.createReview, 
      [user_name, review, rating, id],
      (error, results) =>{
        if(error){
          throw new Error(error);
        }

        res.status(201).json({
          message: `a new review has just added to restaurant of id ${id}`,
          review: results.rows[0]
        })
      }
    );
    connection.release()
  } catch (error) {
    throw new Error(`cant't add a new review due to ${error}`);
  }
};

export default {
  getRestaurants, 
  getRestaurantById, 
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  createReview
};
