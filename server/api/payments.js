import Stripe from 'stripe';

export default function payments(server) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

  server.post('/api/create-checkout-session', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.items,
        success_url: 'http://localhost:5173/?success=true',
        cancel_url: 'http://localhost:5173/?canceled=true',
      });
      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
