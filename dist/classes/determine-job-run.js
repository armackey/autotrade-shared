"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetermineJobRun = void 0;
var date_fns_1 = require("date-fns");
var date_fns_tz_1 = require("date-fns-tz");
var DetermineJobRun = /** @class */ (function () {
    function DetermineJobRun() {
        this.date = Date.now();
    }
    DetermineJobRun.prototype.isTradingHours = function () {
        return this.isCorrectDay() && this.isCorrectTime();
    };
    DetermineJobRun.prototype.isCorrectDay = function () {
        return (0, date_fns_1.isMonday)(this.date) || (0, date_fns_1.isTuesday)(this.date) || (0, date_fns_1.isWednesday)(this.date) || (0, date_fns_1.isThursday)(this.date) || (0, date_fns_1.isFriday)(this.date);
    };
    DetermineJobRun.prototype.isCorrectTime = function () {
        var hour = parseInt((0, date_fns_tz_1.formatInTimeZone)(this.date, 'America/New_York', 'H'));
        var minute = parseInt((0, date_fns_tz_1.formatInTimeZone)(this.date, 'America/New_York', 'm'));
        return (hour === 9 && minute >= 20) || (hour > 9 && hour < 16);
    };
    return DetermineJobRun;
}());
exports.DetermineJobRun = DetermineJobRun;
