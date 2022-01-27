import { AutoTradeCandle } from "..";
export declare class IndicatorBase {
    private candles;
    points: number;
    constructor(candles: AutoTradeCandle[]);
    calcPoints(): void;
    shouldRemoveFromWatchList(points: number): boolean;
    private ma_helper;
    private getEMA;
    private getSMA;
    private isRSIBuyable;
    private calcMACD;
    private indicatorMapHelper;
}
