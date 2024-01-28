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
    successUrl: `https://www.nglquestions.com/success`,
    cancelUrl: `https://www.nglquestions.com/cancel`,
    customerEmail: email,
  });
};
