import { PolygonBase } from "./polygon-base";
import { TickerNameSymbol } from '..';
import { IAggs } from "@polygon.io/client-js";
export declare class PolygonAggregate extends PolygonBase {
    constructor(api: string);
    /**
   * Will get the minute, 5 minute, 30 minute, 1 hour, and 1 day
   * result_1 is 1, 5, 30 minute intervals
   * result_2 is 1 hour and 1 day intervals
   * @param tickers
   */
    init(tickers: TickerNameSymbol[], multipliers?: number[], timespan?: string[], additionalFilters?: Function[]): Promise<{
        one_minute?: IAggs[];
        five_minute?: IAggs[];
        thirty_minute?: IAggs[];
        one_hour?: IAggs[];
        one_day?: IAggs[];
    } | undefined>;
    private onMultiplier;
    private onTimeSpan;
    private getCandles;
    private createKey;
}
