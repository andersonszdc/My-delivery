import CreatePaymentIntent from "../../../services/CreatePaymentIntent";

export default {
  Mutation: {
    createPaymentIntent:  (parent, { items }) => {
      return CreatePaymentIntent(items);
    },
  },
};
