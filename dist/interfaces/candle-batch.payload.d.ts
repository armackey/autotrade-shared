import { CandleInterval } from "../enums";
export interface CandleBatchPayload {
    symbol: string;
    interval: CandleInterval;
    limit: number;
    startTime?: number;
    endTime: number;
}
