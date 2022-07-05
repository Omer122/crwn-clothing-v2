import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //Generic Router

import App from './App';
import {UserProvider} from './contexts/user.context';
import {ProductsProvider} from './contexts/products.context';

import './index.scss';
import { CartProvider } from './contexts/cart.context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


