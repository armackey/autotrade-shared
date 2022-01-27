import { WatchListItem } from '..';
export declare class WatchListUpdate {
    getWatchListByName(name: string): Promise<any>;
    updateWatchList(list: WatchListItem[], name: string, data: WatchListItem): Promise<any>;
    saveWatchList(name: string, items: {
        ticker: string;
        points: number;
    }[]): Promise<any>;
    removeItemFromWatchList(list: WatchListItem[], name: string, data: WatchListItem): Promise<any>;
}
