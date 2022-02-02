import { AutoTradeCandle } from "..";
interface Point {
    x: number;
    y: string;
}
export declare class IndicatorBase {
    private candles;
    points: number;
    constructor(candles: AutoTradeCandle[]);
    calcPoints(): void;
    shouldRemoveFromWatchList(points: number): boolean;
    private ma_helper;
    getEMA(period: number, candles: AutoTradeCandle[]): Point[];
    getSMA(period: number, candles: AutoTradeCandle[]): Point[];
    private isRSIBuyable;
    private calcMACD;
    private indicatorMapHelper;
}
export {};
