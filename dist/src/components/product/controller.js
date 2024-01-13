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
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.list = void 0;
const responses_1 = require("../../network/responses");
const db_1 = require("../../db");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
function list(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield db_1.prisma.product.findMany();
            return (0, responses_1.responseSuccess)({ res, data: products });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.list = list;
function store(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ok, data } = (0, utils_2.mapInsertProduct)(req.body);
            if (!ok) {
                return (0, responses_1.responseError)({ res, data });
            }
            const newProduct = yield db_1.prisma.product.create({ data });
            return (0, responses_1.responseSuccess)({ res, data: newProduct });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.store = store;
