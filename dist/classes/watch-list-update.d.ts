export declare class WatchListUpdate {
    getWatchListByName(name: string): any;
    updateWatchList(list: {
        ticker: string;
        points: number;
    }[], name: string, data: {
        ticker: string;
        points: number;
    }): Promise<any>;
    saveWatchList(name: string, items: {
        ticker: string;
        points: number;
    }[]): any;
}
