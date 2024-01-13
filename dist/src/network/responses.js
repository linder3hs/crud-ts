"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = exports.responseSuccess = void 0;
function responseSuccess({ res, data, status = 200, }) {
    return res.status(status).json({
        ok: true,
        data,
    });
}
exports.responseSuccess = responseSuccess;
function responseError({ res, data, status = 500, }) {
    return res.status(status).json({
        ok: false,
        data,
    });
}
exports.responseError = responseError;
