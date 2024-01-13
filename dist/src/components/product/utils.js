"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapInsertProduct = void 0;
const utils_1 = require("../../utils");
function mapProduct(product) {
    const productMap = Object.assign(Object.assign({}, product), { isNew: product.is_new, pertangeDiscount: product.pertange_discount });
    delete productMap.is_new;
    delete productMap.pertange_discount;
    if (product.category_id) {
        productMap.categoryId = product.category_id;
        delete productMap.category_id;
    }
    return productMap;
}
function mapInsertProduct(body) {
    const { product, category } = body;
    // caso 1: Que nos envien product.category_id y category
    if (product.category_id && category) {
        return (0, utils_1.response)({
            ok: false,
            data: "No puedes enviar un category_id y category",
        });
    }
    // caso 2: Nos envian product y category
    if (product && category) {
        const insertData = Object.assign(Object.assign({}, mapProduct(product)), { category: {
                create: Object.assign({}, category),
            } });
        return (0, utils_1.response)({ ok: true, data: insertData });
    }
    return (0, utils_1.response)({ ok: true, data: mapProduct(product) });
}
exports.mapInsertProduct = mapInsertProduct;
