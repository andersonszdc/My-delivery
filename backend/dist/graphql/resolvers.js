"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var merge_1 = require("@graphql-tools/merge");
var load_files_1 = require("@graphql-tools/load-files");
var resolversArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, "modules", "**", "resolvers.*"));
exports.default = (0, merge_1.mergeResolvers)(resolversArray);
