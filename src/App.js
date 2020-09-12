import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Shipment from './Components/Shipment/Shipment';

import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';

export const UserContext =createContext();

function App() {

  const [loggedInUser,setLoggedInUser]=useState({})


  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <h3>Email: {loggedInUser.email}</h3>


     

      <Router>
      <Header></Header>
        <Switch>

          <Route path='/shop'>
            <Shop></Shop>

          </Route>
          <Route path='/review'>

            <Review></Review>

          </Route>

          <PrivateRoute path='/inventory'>
            <Inventory></Inventory>

          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
            
          </Route>

          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path='/'>
            <Shop></Shop>
          </Route>

          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>

          </Route>

          <Route path='*'>
            <NotFound></NotFound>

          </Route>

        </Switch>
      </Router>

      
      
      
    </UserContext.Provider>
  );
}

export default App;
