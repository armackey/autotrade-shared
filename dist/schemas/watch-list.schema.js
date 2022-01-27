"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListModel = void 0;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WatchListSchema = new Schema({
    name: String,
    items: [
        {
            ticker: String,
            lastCandleTime: Number,
            points: { type: Number, default: 0 }
        }
    ],
    updatedAt: Number
}, { timestamps: true });
exports.WatchListModel = mongoose.model('WatchList', WatchListSchema);
