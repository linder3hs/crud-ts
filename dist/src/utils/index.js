"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponseError = exports.response = void 0;
const db_1 = require("../db");
const responses_1 = require("../network/responses");
function response({ ok, data }) {
    return {
        ok,
        data,
    };
}
exports.response = response;
function handleResponseError(res, error) {
    if (error instanceof db_1.prismaError) {
        return (0, responses_1.responseError)({
            res,
            data: `DB Error(${error.code}): ${error.message}`,
        });
    }
    return (0, responses_1.responseError)({ res, data: `Error: ${error}` });
}
exports.handleResponseError = handleResponseError;
