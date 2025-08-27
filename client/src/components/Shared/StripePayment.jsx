const StripePayment = async (name, price) => {
  const createSession = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          price_data: {
            currency: 'sek', // currency
            product_data: {
              name: name, // name of the product
            },
            unit_amount: price * 100, // price of the item, in öre
          },
          quantity: 1, // amount bought
        },
      ],
    }),
  });

  const result = await createSession.json();
  console.log(result);
  window.location = result.url;
  return <></>;
};
export default StripePayment;
