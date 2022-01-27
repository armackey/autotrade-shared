const mongoose = require('mongoose');

export * from './binance-product.schema';
export * from './ticker-symbol.schema';
export * from './watch-list.schema';


export function initiateMongoose(uri: string): Promise<any> {
  return mongoose.connect(uri);
}