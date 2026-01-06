const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const fetch = require('node-fetch');
const app = express();
app.use(bodyParser.json());

// Simple checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  const { line_items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: process.env.SUCCESS_URL || 'https://your-domain.com/success',
    cancel_url: process.env.CANCEL_URL || 'https://your-domain.com/cancel',
  });
  res.json({ id: session.id });
});

// Printful webhook example (pseudo-verification)
app.post('/api/webhooks/printful', (req, res) => {
  const event = req.body;
  // TODO: verify signature using PRINTFUL signature header
  console.log('Received Printful webhook', event);
  // Update order status in DB (pseudo)
  res.status(200).send('ok');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server listening on', port));
