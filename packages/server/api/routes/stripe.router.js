const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router({ mergeParams: true });
const stripeController = require('../controllers/stripe.controller');

/**
 * @swagger
 * /ratings:
 *  get:
 *    tags:
 *    - ratings
 *    summary: Get all product's ratings
 *    description:
 *      Will return all ratings of product.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: false
 *         description: The ratings of the user to get
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/customers', (req, res, next) => {
  // TO DO : once we will add authentication I will update it
  if (req.query.userEmail) {
    stripeController
      .getStripeCustomerByEmail(req.query.userEmail)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    stripeController
      .getStripeCustomers()
      .then((result) => res.json(result))
      .catch(next);
  }
});

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: process.env.PUBLIC_STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/success`,
    cancel_url: `${process.env.DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

module.exports = router;
