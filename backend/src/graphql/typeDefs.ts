import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { gql } from "apollo-server-express";
import productSchema from "./modules/products/schema";
import paymentIntentSchema from "./modules/paymentIntent/schema";
import orderSchema from "./modules/order/schema";
import orderItemSchema from "./modules/orderItem/schema";

// const typesArray = loadFilesSync(
//   path.join(__dirname, "modules", "**", "*.gql")
// );

// export default mergeTypeDefs(typesArray);

const gqlWrapper = (...files: string[]) => {
  return gql`
    ${files}
  `;
};

export default gqlWrapper(productSchema, paymentIntentSchema, orderSchema, orderItemSchema);
