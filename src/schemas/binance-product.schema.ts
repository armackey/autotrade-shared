const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BinanceProductSchema = new Schema({
  name: String,
  symbol: String,
  ignore: Boolean,
  updatedAt: Number
}, { timestamps: true } );

export const BinanceProductModel = mongoose.model('BinanceProduct', BinanceProductSchema);
