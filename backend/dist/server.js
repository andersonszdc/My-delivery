"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var schema_1 = require("@graphql-tools/schema");
var apollo_server_express_1 = require("apollo-server-express");
var graphql_1 = require("graphql");
var resolvers_1 = __importDefault(require("./graphql/resolvers"));
var typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
require("./database");
dotenv_1.default.config();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, httpServer, schema, subscriptionServer, server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                httpServer = http_1.default.createServer(app);
                schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
                subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
                    schema: schema,
                    execute: graphql_1.execute,
                    subscribe: graphql_1.subscribe,
                }, {
                    server: httpServer,
                    path: "/graphql",
                });
                server = new apollo_server_express_1.ApolloServer({
                    schema: schema,
                    plugins: [
                        {
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            subscriptionServer.close();
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                },
                                            }];
                                    });
                                });
                            },
                        },
                    ],
                });
                return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                server.applyMiddleware({ app: app });
                httpServer.listen(4000, function () {
                    return console.log("Server is now running on http://localhost:4000/graphql");
                });
                return [2 /*return*/];
        }
    });
}); })();
