import React from 'react';
import './App.css';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Pei0mRsnIumbWv7jhTbNk9GBwYogGbePYEHk4oFV8Pte0XfpQnVIDKU5lh4zEwjZv52Jlib9HkDlobKoI4SDeqr00bulqJGTy');

function App () {
  const handleSubmit = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5001/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error('Error: ', error);
    }
  }

  return (
    <button onClick={handleSubmit}>Pay now</button>
  );
}

export default App;
