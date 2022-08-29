import './App.css';
import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import UpdateRestaurant from './pages/UpdateRestaurant';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/restaurant-page/:id' element={<RestaurantPage/>}/>
          <Route path='/update-restaurant/:id' element={<UpdateRestaurant/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
