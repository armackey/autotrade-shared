import { WatchListModel } from '..';

export class WatchListUpdate {
  getWatchListByName(name: string) {
    return WatchListModel.findOne({ name }).exec();
  }

  async updateWatchList(list: { ticker: string, points: number }[], name: string, data: { ticker: string, points: number }) {
    const index = list?.findIndex((l, index) => l.ticker === data?.ticker);
    if (index > -1) list?.splice(index, 1, data);
    else list = [ ...list, data ];
    return WatchListModel.updateOne({ name }, { name, items: list }, { multi: true }).exec();
  }

  saveWatchList(name: string, items: { ticker: string, points: number }[]) {
    return WatchListModel.create({ name, items });
  }
}
