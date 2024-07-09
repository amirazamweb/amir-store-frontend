import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { AuthProvider } from './context/auth';
import { BgProvider } from './context/bg';
import { CartProvider } from './context/cart';
import { CartQuantityProvider } from './context/cartQuantityContext';
import { ResetPasswordWmailProvider } from './context/resetPasswordEmail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <CartProvider>
    <ResetPasswordWmailProvider>
    <CartQuantityProvider>
  <AuthProvider>
    <BgProvider>
    <RouterProvider router={router}/>
    </BgProvider>
  </AuthProvider>
  </CartQuantityProvider>
  </ResetPasswordWmailProvider>
  </CartProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
