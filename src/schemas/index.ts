import mongoose from "mongoose";

export * from './binance-product.schema';
export * from './ticker-symbol.schema';
export * from './watch-list.schema';


function initiateMongoose(uri: string): Promise<any> {
  return mongoose.connect(uri);
}