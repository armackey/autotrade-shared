const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WatchListSchema = new Schema({
  name: String,
  items: [
    {
      ticker: String,
      lastCandleTime: Number,
      points: { type: Number, default: 0 }
    }
  ],
  updatedAt: Number
}, { timestamps: true } );

export const WatchListModel = mongoose.model('WatchList', WatchListSchema);
