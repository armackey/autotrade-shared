"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonAggregate = void 0;
var polygon_base_1 = require("./polygon-base");
var date_fns_1 = require("date-fns");
var PolygonAggregate = /** @class */ (function (_super) {
    __extends(PolygonAggregate, _super);
    function PolygonAggregate(api) {
        return _super.call(this, api) || this;
    }
    /**
   * Will get the minute, 5 minute, 30 minute, 1 hour, and 1 day
   * result_1 is 1, 5, 30 minute intervals
   * result_2 is 1 hour and 1 day intervals
   * @param tickers
   */
    PolygonAggregate.prototype.init = function (tickers, multipliers, timespan, additionalFilters) {
        if (multipliers === void 0) { multipliers = []; }
        if (timespan === void 0) { timespan = []; }
        return __awaiter(this, void 0, void 0, function () {
            var to, from, obj, result_one, result_two, merged_one, merged_two, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = Date.now();
                        from = (0, date_fns_1.subDays)(new Date(to), 10);
                        obj = {};
                        multipliers.sort();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!multipliers.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(tickers.map(function (ticker) { return _this.onMultiplier(ticker.symbol, 'minute', multipliers, (0, date_fns_1.format)(from, 'yyyy-MM-dd'), (0, date_fns_1.format)(to, 'yyyy-MM-dd'), { limit: 120 }); }))];
                    case 2:
                        result_one = _a.sent();
                        merged_one = [].concat.apply([], result_one);
                        if (additionalFilters === null || additionalFilters === void 0 ? void 0 : additionalFilters.length) {
                        }
                        multipliers.map(function (m, idx) {
                            var _a;
                            obj = __assign(__assign({}, obj), (_a = {}, _a[_this.createKey(m)] = merged_one.filter(function (item, index) { var _a; return (index % multipliers.length === idx) && ((_a = item === null || item === void 0 ? void 0 : item.results) === null || _a === void 0 ? void 0 : _a.length) > 100; }), _a));
                        });
                        _a.label = 3;
                    case 3:
                        if (!timespan.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(tickers.map(function (ticker) { return _this.onTimeSpan(ticker.symbol, 1, ['hour', 'day'], (0, date_fns_1.format)(from, 'yyyy-MM-dd'), (0, date_fns_1.format)(to, 'yyyy-MM-dd'), { limit: 120 }); }))];
                    case 4:
                        result_two = _a.sent();
                        merged_two = [].concat.apply([], result_two);
                        timespan.map(function (m, idx) {
                            var _a;
                            obj = __assign(__assign({}, obj), (_a = {}, _a[_this.createKey(m)] = merged_two.filter(function (item, index) { var _a; return (index % multipliers.length === idx) && ((_a = item === null || item === void 0 ? void 0 : item.results) === null || _a === void 0 ? void 0 : _a.length) > 100; }), _a));
                        });
                        _a.label = 5;
                    case 5: 
                    // const merged_one = [].concat.apply([], result_one);
                    // const merged_two = [].concat.apply([], result_two);
                    // merged_one = merged_one.map(item => ({ open: item.o, high: item.h, low: item.l, close: item.c, openTime: item.t, volume: item.v }));
                    // merged_two = merged_two.map(item => ({ open: item.o, high: item.h, low: item.l, close: item.c, openTime: item.t, volume: item.v }));
                    return [2 /*return*/, __assign({}, obj
                        // one_minute: merged_one.filter((item, index) => (index % 3 === 0) && item?.results?.length > 100),
                        // five_minute: merged_one.filter((item, index) => (index % 3 === 1) && item?.results?.length > 100),
                        // thirty_minute: merged_one.filter((item, index) => (index % 3 === 2) && item?.results?.length > 100),
                        // one_hour: merged_two.filter((item, index) => (index % 2 === 0) && item?.results?.length > 100),
                        // one_day: merged_two.filter((item, index) => (index % 2 !== 0) && item?.results?.length > 100)
                        )];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PolygonAggregate.prototype.onMultiplier = function (ticker, timespan, multipliers, from, to, query) {
        var _this = this;
        return Promise.all(multipliers.map(function (multiplier) { return _this.getCandles(ticker, multiplier, timespan, from, to, query); }));
    };
    PolygonAggregate.prototype.onTimeSpan = function (tickerSymbol, multiplier, timespans, from, to, query) {
        var _this = this;
        return Promise.all(timespans.map(function (time) { return _this.getCandles(tickerSymbol, multiplier, time, from, to, query); }));
    };
    PolygonAggregate.prototype.getCandles = function (tickerSymbol, multiplier, timespan, from, to, query) {
        return this.client.stocks.aggregates(tickerSymbol, multiplier, timespan, from, to, __assign(__assign({}, query), { sort: 'desc' }));
    };
    PolygonAggregate.prototype.createKey = function (item) {
        switch (item) {
            case 1: {
                return 'one_minute';
            }
            case 5: {
                return 'five_minute';
            }
            case 30: {
                return 'thirty_minute';
            }
            case 'hour': {
                return 'one_hour';
            }
            case 'day': {
                return 'one_day';
            }
        }
    };
    return PolygonAggregate;
}(polygon_base_1.PolygonBase));
exports.PolygonAggregate = PolygonAggregate;
