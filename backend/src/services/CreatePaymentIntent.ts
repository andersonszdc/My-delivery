import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  { apiVersion: "2020-08-27" }
);

console.log(process.env.STRIPE_SECRET_KEY)
console.log(process.env.NODE_ENV)

const CreatePaymentIntent = async (items: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "brl",
    payment_method_types: ["card"],
  });
  return paymentIntent.client_secret;
};

export default CreatePaymentIntent;
