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
exports.IndicatorBase = void 0;
var trading_signals_1 = require("trading-signals");
var IndicatorBase = /** @class */ (function () {
    function IndicatorBase(candles) {
        this.candles = candles;
        this.points = 0;
    }
    IndicatorBase.prototype.isPurchasable = function () {
        if (!this.isRSIBuyable(__spreadArray([], this.candles, true)))
            return false;
        this.points += 1;
        var ema5 = this.getEMA(5, this.candles);
        var sma9 = this.getSMA(9, this.candles);
        // console.log(format(ema5[0]?.x, 'MM-dd-yyyy HH:mm aaa'))
        // console.log('ema5', parseFloat(ema5[0]?.y).toFixed(5))
        // console.log('sma9', parseFloat(sma9[0]?.y).toFixed(5))
        // console.log('ema5 > sma9', ema5 > sma9);
        if (!this.ma_helper(ema5, sma9)) {
            return false;
        }
        this.points += 1;
        var sma20 = this.getSMA(20, this.candles);
        var sma50 = this.getSMA(50, this.candles);
        if (!this.ma_helper(sma9, sma20)) {
            return false;
        }
        this.points += 1;
        if (!this.ma_helper(sma20, sma50)) {
            return false;
        }
        this.points += 1;
        return true;
    };
    IndicatorBase.prototype.shouldRemoveFromWatchList = function () {
        return false;
    };
    IndicatorBase.prototype.ma_helper = function (lower, higher) {
        var _a, _b, _c, _d, _e;
        if (parseFloat(lower[3].y) > parseFloat((_a = higher[3]) === null || _a === void 0 ? void 0 : _a.y)) {
            return false;
        }
        return (parseFloat((_b = lower[0]) === null || _b === void 0 ? void 0 : _b.y) > parseFloat((_c = higher[0]) === null || _c === void 0 ? void 0 : _c.y)) && (parseFloat((_d = lower[1]) === null || _d === void 0 ? void 0 : _d.y) > parseFloat((_e = higher[1]) === null || _e === void 0 ? void 0 : _e.y));
    };
    IndicatorBase.prototype.getEMA = function (period, candles) {
        var ema = new trading_signals_1.EMA(period);
        return this.indicatorMapHelper(period, candles, ema);
    };
    IndicatorBase.prototype.getSMA = function (period, candles) {
        var sma = new trading_signals_1.SMA(period);
        return this.indicatorMapHelper(period, candles, sma);
    };
    IndicatorBase.prototype.isRSIBuyable = function (candles) {
        var rsi = new trading_signals_1.RSI(14);
        __spreadArray([], candles, true).reverse().map(function (candle) { return rsi.update((candle === null || candle === void 0 ? void 0 : candle.c) || (candle === null || candle === void 0 ? void 0 : candle.close)); });
        if (!rsi.isStable)
            return false;
        var result = parseFloat(rsi.getResult().toFixed(2));
        return result > 49 && result < 60;
    };
    IndicatorBase.prototype.calcMACD = function (candles) {
        var macd = new trading_signals_1.MACD({ longInterval: 26, shortInterval: 12, signalInterval: 9, indicator: trading_signals_1.DEMA });
        try {
            candles.map(function (candle) { return macd.update((candle === null || candle === void 0 ? void 0 : candle.close) || (candle === null || candle === void 0 ? void 0 : candle.c)); });
            var result = macd.getResult();
            if (!macd.isStable)
                return false;
            return result.macd.toFixed(2) > result.signal.toFixed(2);
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    IndicatorBase.prototype.indicatorMapHelper = function (period, candles, instance) {
        var array = __spreadArray([], candles, true).map(function (item, index) { return (candles.slice(index, period + index)); }).filter(function (candles) { return candles.length === period; });
        array.reverse();
        var complete = array.map(function (candles, index) {
            candles.map(function (c) {
                instance.update(c.c || c.close);
            });
            return instance.getResult().valueOf();
        });
        return complete.map(function (c, index) {
            return {
                y: c,
                x: array[index][0].openTime || array[index][0].t
            };
        }).reverse();
    };
    return IndicatorBase;
}());
exports.IndicatorBase = IndicatorBase;
