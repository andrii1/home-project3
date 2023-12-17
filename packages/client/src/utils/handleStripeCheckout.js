import getStripe from '../lib/getStripe';

export const handleStripeCheckout = async (email) => {
  const stripe = await getStripe();
  const { error1 } = await stripe.redirectToCheckout({
    lineItems: [
      {
        price: `${process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID}`,
        quantity: 1,
      },
    ],
    mode: 'payment',
    successUrl: `http://localhost:3000/success`,
    cancelUrl: `http://localhost:3000/cancel`,
    customerEmail: email,
  });
};
