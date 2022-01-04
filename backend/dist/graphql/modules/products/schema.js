"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "type Product {\n  name: String\n  description: String\n}\n\ntype Query {\n  products: [Product]\n}\n\ntype Mutation {\n  addProduct(name: String, description: String): Product\n  updateProduct(id: String, name: String, description: String): Product\n}\n\ntype Subscription {\n  productAdded: Product\n}\n";
