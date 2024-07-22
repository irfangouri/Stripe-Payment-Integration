const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(
  STRIPE_SECRET_KEY,
);

router.post('/create-payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product Name',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success',
      cancel_url: 'https://localhost:5000/cancel',
    });

    res.status(201).json({
      id: session.id,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;