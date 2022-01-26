"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonBase = void 0;
var client_js_1 = require("@polygon.io/client-js");
var PolygonBase = /** @class */ (function () {
    function PolygonBase(api) {
        this.api = api;
        this.client = (0, client_js_1.restClient)(api);
        this.wsClient = (0, client_js_1.websocketClient)(api);
        this.referenceClient = (0, client_js_1.referenceClient)(api);
    }
    return PolygonBase;
}());
exports.PolygonBase = PolygonBase;
