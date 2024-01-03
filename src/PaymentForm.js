// PaymentForm.js
import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePaymentSubmit = async (e) => {
    

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber, expiryDate, cvv }),
      });

      if (response.ok) {
        console.log('Payment successful!');
      } else {
        console.error('Payment failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="container">
        
      <div className="form-box">
        <h1>PAYMENT WEB PAGE</h1>
        <form onSubmit={handlePaymentSubmit}>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
            />
          </label>
          <button type="submit">Submit Payment</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
