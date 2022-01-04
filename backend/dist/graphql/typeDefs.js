"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = __importDefault(require("./modules/products/schema"));
// const typesArray = loadFilesSync(
//   path.join(__dirname, "modules", "**", "*.gql")
// );
// export default mergeTypeDefs(typesArray);
var gqlWrapper = function () {
    var files = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        files[_i] = arguments[_i];
    }
    return (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), files);
};
exports.default = gqlWrapper(schema_1.default);
var templateObject_1;
