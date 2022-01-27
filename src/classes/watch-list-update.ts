import { WatchListItem, WatchListModel } from '..';

export class WatchListUpdate {
  getWatchListByName(name: string): Promise<any> {
    return WatchListModel.findOne({ name }).exec();
  }

  updateWatchList(list: WatchListItem[], name: string, data: WatchListItem): Promise<any> {
    const index = list?.findIndex((l, index) => l.ticker === data?.ticker);
    if (index > -1) list?.splice(index, 1, data);
    else list = [ ...list, data ];
    return WatchListModel.updateOne({ name }, { name, items: list }, { multi: true }).exec();
  }

  saveWatchList(name: string, items: { ticker: string, points: number }[]): Promise<any> {
    return WatchListModel.create({ name, items });
  }

  removeItemFromWatchList(list: WatchListItem[], name: string, data: WatchListItem): Promise<any> {
    const index = list?.findIndex((l, index) => l.ticker === data?.ticker);
    if (index > -1) list?.splice(index, 1);
    return WatchListModel.updateOne({ name }, { name, items: list }, { multi: true }).exec();
  }
}
