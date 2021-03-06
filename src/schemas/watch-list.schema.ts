const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WatchListSchema = new Schema({
  name: String,
  items: [
    {
      name: String,
      ticker: String,
      lastCandleTime: Number,
      lastCandleTimeReadable: String,
      points: { type: Number, default: 0 }
    }
  ],
  updatedAt: Number
}, { timestamps: true } );

export const WatchListModel = mongoose.model('WatchList', WatchListSchema);
