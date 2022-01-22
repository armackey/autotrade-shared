"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerSymbolAndCompanyNameModel = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TickerSymbolAndCompanyNameSchema = new Schema({
    name: String,
    symbol: String,
    updatedAt: Number
}, { timestamps: true });
exports.TickerSymbolAndCompanyNameModel = mongoose.model('TickerSymbolAndCompanyName', TickerSymbolAndCompanyNameSchema);
