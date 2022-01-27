export interface AutoTradeCandle {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    isFinal?: boolean;
    buyVolume: number;
    openTime?: number;
    closeTime?: number;
    interval: string;
    symbol: string;
}
