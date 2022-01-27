import { AutoTradeCandle } from "..";
import { EMA, SMA, RSI, MACD, DEMA } from "trading-signals";

interface Point {
  x: number;
  y: string;
}


export class IndicatorBase {
  points = 0;

  constructor(private candles: AutoTradeCandle[]) {}

  isPurchasable(): boolean {
    
    if (!this.isRSIBuyable([...this.candles])) return false;
    
    this.points += 1;

    const ema5 = this.getEMA(5, this.candles);
    const sma9 = this.getSMA(9, this.candles);

    // console.log(format(ema5[0]?.x, 'MM-dd-yyyy HH:mm aaa'))
    // console.log('ema5', parseFloat(ema5[0]?.y).toFixed(5))
    // console.log('sma9', parseFloat(sma9[0]?.y).toFixed(5))
    // console.log('ema5 > sma9', ema5 > sma9);

    if (!this.ma_helper(ema5, sma9)) { return false; }

    this.points += 1;

    const sma20 = this.getSMA(20, this.candles);
    const sma50 = this.getSMA(50, this.candles);


    if (!this.ma_helper(sma9, sma20)) { return false; }

    this.points += 1;

    if (!this.ma_helper(sma20, sma50)) { return false; }

    this.points += 1;

    return true;
  }

  shouldRemoveFromWatchList(): boolean {
    return false;
  }

  private ma_helper(lower: Point[], higher: Point[]): boolean {
    if (parseFloat(lower[3].y) > parseFloat(higher[3]?.y)) { return false }
    return ( parseFloat(lower[0]?.y) > parseFloat(higher[0]?.y) ) && ( parseFloat(lower[1]?.y) > parseFloat(higher[1]?.y) );
  }

  private getEMA(period: number, candles: AutoTradeCandle[]): Point[] {
    const ema = new EMA(period);
    return this.indicatorMapHelper(period, candles, ema);
  }

  private getSMA(period: number, candles: AutoTradeCandle[]): Point[] {
    const sma = new SMA(period);
    return this.indicatorMapHelper(period, candles, sma);
  }

  private isRSIBuyable(candles: any[]): boolean {
    const rsi = new RSI(14);
    [ ...candles].reverse().map(candle => rsi.update(candle?.c || candle?.close));
    if (!rsi.isStable) return false;
    
    const result = parseFloat(rsi.getResult().toFixed(2));
    return result > 49 && result < 60;
  }

  private calcMACD(candles: any[]): boolean {
    const macd = new MACD({ longInterval: 26, shortInterval: 12, signalInterval: 9, indicator: DEMA });
    try {
      candles.map(candle => macd.update(candle?.close || candle?.c));
      const result = macd.getResult();

      if (!macd.isStable) return false;
      return result.macd.toFixed(2) > result.signal.toFixed(2); 
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private indicatorMapHelper(period: number, candles: any[], instance: SMA | EMA) {
    const array = [...candles].map((item, index) => ( candles.slice(index, period + index) )).filter(candles => candles.length === period);
    array.reverse();
    const complete = array.map((candles, index) => {
      candles.map(c => {
        instance.update(c.c || c.close);
      });
      return instance.getResult().valueOf();
    });

    return complete.map((c, index) => {
      return {
        y: c,
        x: array[index][0].openTime || array[index][0].t
      }
    }).reverse();
  }
}