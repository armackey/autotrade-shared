import { AutoTradeCandle } from "..";
export declare class IndicatorBase {
    private candles;
    points: number;
    constructor(candles: AutoTradeCandle[]);
    isPurchasable(): boolean;
    shouldRemoveFromWatchList(): boolean;
    private ma_helper;
    private getEMA;
    private getSMA;
    private isRSIBuyable;
    private calcMACD;
    private indicatorMapHelper;
}
