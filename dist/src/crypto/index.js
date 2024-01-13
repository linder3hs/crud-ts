"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const node_crypto_1 = require("node:crypto");
function hash(text) {
    return (0, node_crypto_1.createHmac)("sha256", "secret").update(text).digest("hex");
}
exports.hash = hash;
