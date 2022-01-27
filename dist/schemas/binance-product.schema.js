"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceProductModel = void 0;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BinanceProductSchema = new Schema({
    name: String,
    symbol: String,
    ignore: Boolean,
    updatedAt: Number
}, { timestamps: true });
exports.BinanceProductModel = mongoose.model('BinanceProduct', BinanceProductSchema);
