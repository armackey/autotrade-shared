export interface WatchListItem {
  ticker: string,
  points: number,
  lastCandleTime: number,
  lastCandleTimeReadable: string,
  _id?: string,
}

export interface WatchList {
  name: string,
  items: WatchListItem[],
  _id: string
}

export interface WatchListWrapper {
  stocks: WatchList,
  crypto: WatchList
}
