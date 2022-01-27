import { PolygonBase } from "./polygon-base";
import { format, subDays } from 'date-fns';
import { TickerNameSymbol } from '..';
import { IAggs, IAggsQuery } from "@polygon.io/client-js";

export class PolygonAggregate extends PolygonBase {
  constructor(api: string) {
    super(api);
  }

    /**
   * Will get the minute, 5 minute, 30 minute, 1 hour, and 1 day
   * result_1 is 1, 5, 30 minute intervals
   * result_2 is 1 hour and 1 day intervals
   * @param tickers 
   */
     async init(tickers: TickerNameSymbol[], multipliers: number[] = [], timespan: string[] = []): Promise<{ one_minute?: IAggs[], five_minute?: IAggs[], thirty_minute?: IAggs[], one_hour?: IAggs[], one_day?: IAggs[] } | undefined> {
      const to = Date.now();
      const from = subDays(new Date(to), 10);
      let obj = {};
      let result_one: any;
      let result_two: any;
      let merged_one: any;
      let merged_two: any;
      
      multipliers.sort();
  
      try {
        if (multipliers.length) {
          result_one = await Promise.all(tickers.map(ticker => this.onMultiplier(ticker.symbol, 'minute', multipliers, format(from, 'yyyy-MM-dd'), format(to, 'yyyy-MM-dd'), { limit: 120 })));
          merged_one = [].concat.apply([], result_one);
  
          multipliers.map((m, idx) => {
            obj = {
              ...obj,
              [this.createKey(m) as string]: merged_one.filter((item: any, index: number) => (index % multipliers.length === idx) && item?.results?.length > 100)
            };
          });
        }
  
        if (timespan.length) {
          result_two = await Promise.all(tickers.map(ticker => this.onTimeSpan(ticker.symbol, 1, ['hour', 'day'], format(from, 'yyyy-MM-dd'), format(to, 'yyyy-MM-dd'), { limit: 120 })));
          merged_two = [].concat.apply([], result_two);
  
          timespan.map((m, idx) => {
            obj = {
              ...obj,
              [this.createKey(m) as string]: merged_two.filter((item: any, index: number) => (index % multipliers.length === idx) && item?.results?.length > 100)
            };
          });
        }
        // const merged_one = [].concat.apply([], result_one);
        // const merged_two = [].concat.apply([], result_two);
  
        // merged_one = merged_one.map(item => ({ open: item.o, high: item.h, low: item.l, close: item.c, openTime: item.t, volume: item.v }));
        // merged_two = merged_two.map(item => ({ open: item.o, high: item.h, low: item.l, close: item.c, openTime: item.t, volume: item.v }));
        
        return {
          ...obj
          // one_minute: merged_one.filter((item, index) => (index % 3 === 0) && item?.results?.length > 100),
          // five_minute: merged_one.filter((item, index) => (index % 3 === 1) && item?.results?.length > 100),
          // thirty_minute: merged_one.filter((item, index) => (index % 3 === 2) && item?.results?.length > 100),
          // one_hour: merged_two.filter((item, index) => (index % 2 === 0) && item?.results?.length > 100),
          // one_day: merged_two.filter((item, index) => (index % 2 !== 0) && item?.results?.length > 100)
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    private onMultiplier(ticker: string, timespan: 'minute' | 'hour' | 'day', multipliers: number[], from: string, to: string, query?: IAggsQuery) {
      return Promise.all(multipliers.map(multiplier => this.getCandles(ticker, multiplier, timespan, from, to, query)));
    }
  
    private onTimeSpan(tickerSymbol: string, multiplier: number, timespans: Array<string>, from: string, to: string, query?: IAggsQuery) {
      return Promise.all(timespans.map((time: string) => this.getCandles(tickerSymbol, multiplier, time, from, to, query)));
    }
  
    private getCandles(tickerSymbol: string, multiplier: number, timespan: string, from: string, to: string, query?: IAggsQuery): Promise<IAggs> {
      return this.client.stocks.aggregates(tickerSymbol, multiplier, timespan, from, to, { ...query, sort: 'desc' });
    }
  
    private createKey(item: number | string) {
      switch(item) {
        case 1: {
          return 'one_minute';
        }
        case 5: {
          return 'five_minute';
        }
        case 30: {
          return 'thirty_minute';
        }
        case 'hour': {
          return 'one_hour';
        }
        case 'day': {
          return 'one_day';
        }
      }
    }
}
