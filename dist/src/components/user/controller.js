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
exports.destroy = exports.update = exports.store = exports.getById = exports.list = void 0;
const db_1 = require("../../db");
const responses_1 = require("../../network/responses");
const utils_1 = require("../../utils");
const crypto_1 = require("../../crypto");
function list(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield db_1.prisma.user.findMany();
            return (0, responses_1.responseSuccess)({ res, data: users });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.list = list;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: Number(req.params.id),
                },
            });
            if (!user) {
                return (0, responses_1.responseError)({ res, data: "User not found" });
            }
            return (0, responses_1.responseSuccess)({ res, data: user });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.getById = getById;
function store(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body.password = (0, crypto_1.hash)(req.body.password);
            yield db_1.prisma.user.create({ data: req.body });
            return (0, responses_1.responseSuccess)({ res, data: "User created", status: 201 });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.store = store;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body.password) {
                req.body.password = (0, crypto_1.hash)(req.body.password);
            }
            const user = yield db_1.prisma.user.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });
            if (!user) {
                return (0, responses_1.responseError)({ res, data: "User not found" });
            }
            return (0, responses_1.responseSuccess)({ res, data: "User updated" });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.update = update;
function destroy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.prisma.user.delete({ where: { id: Number(req.params.id) } });
            return (0, responses_1.responseSuccess)({ res, data: "User deleted" });
        }
        catch (error) {
            return (0, utils_1.handleResponseError)(res, error);
        }
    });
}
exports.destroy = destroy;
