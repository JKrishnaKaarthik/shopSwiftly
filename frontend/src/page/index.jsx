import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='header'>
        <div className='grocery-cart-icon' />
        <div className='rectangle'>
          <span className='your-orders'>Your orders</span>
          <div className='down-arrow' />
        </div>
        <div className='profile' />
        <div className='rectangle-1'>
          <span className='hello-krishna'>
            Hello <br />
            Krishna
          </span>
        </div>
        <span className='amazin'>AMAZIN</span>
        <div className='background'>
          <span className='text'>Search</span>
        </div>
      </div>
      <div className='rectangle-2' />
      <div className='footer' />
    </div>
  );
}
