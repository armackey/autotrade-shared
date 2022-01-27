const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TickerSymbolAndCompanyNameSchema = new Schema({
  name: String,
  symbol: String,
  ignore: Boolean,
  updatedAt: Number
}, { timestamps: true } );

export const TickerSymbolAndCompanyNameModel = mongoose.model('TickerSymbolAndCompanyName', TickerSymbolAndCompanyNameSchema);