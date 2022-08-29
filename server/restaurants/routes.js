import { Router } from "express";
import controller from './controller.js'

const router = Router();

router.get('/', controller.getRestaurants);
router.get('/get-restaurant/:id', controller.getRestaurantById);
router.post('/create-restaurant', controller.createRestaurant);
router.delete('/delete-restaurant/:id', controller.deleteRestaurant);
router.put('/update-restaurant/:id',controller.updateRestaurant);
router.post('/create-review/:id', controller.createReview);
export default router;
