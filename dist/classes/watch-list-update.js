"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListUpdate = void 0;
var __1 = require("..");
var WatchListUpdate = /** @class */ (function () {
    function WatchListUpdate() {
    }
    WatchListUpdate.prototype.getWatchListByName = function (name) {
        return __1.WatchListModel.findOne({ name: name }).exec();
    };
    WatchListUpdate.prototype.updateWatchList = function (list, name, data) {
        var index = list === null || list === void 0 ? void 0 : list.findIndex(function (l, index) { return l.ticker === (data === null || data === void 0 ? void 0 : data.ticker); });
        if (index > -1)
            list === null || list === void 0 ? void 0 : list.splice(index, 1, data);
        else
            list = __spreadArray(__spreadArray([], list, true), [data], false);
        return __1.WatchListModel.updateOne({ name: name }, { name: name, items: list }, { multi: true }).exec();
    };
    WatchListUpdate.prototype.saveWatchList = function (name, items) {
        return __1.WatchListModel.create({ name: name, items: items });
    };
    WatchListUpdate.prototype.removeItemFromWatchList = function (list, name, data) {
        var index = list === null || list === void 0 ? void 0 : list.findIndex(function (l, index) { return l.ticker === (data === null || data === void 0 ? void 0 : data.ticker); });
        if (index > -1)
            list === null || list === void 0 ? void 0 : list.splice(index, 1);
        return __1.WatchListModel.updateOne({ name: name }, { name: name, items: list }, { multi: true }).exec();
    };
    return WatchListUpdate;
}());
exports.WatchListUpdate = WatchListUpdate;
