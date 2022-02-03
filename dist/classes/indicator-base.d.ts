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
    protected ma_helper(lower: Point[], higher: Point[]): boolean;
    getEMA(period: number, candles: AutoTradeCandle[]): Point[];
    getSMA(period: number, candles: AutoTradeCandle[]): Point[];
    private isRSIBuyable;
    private calcMACD;
    private indicatorMapHelper;
}
export {};
