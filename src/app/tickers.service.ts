import { Injectable } from '@angular/core';
import { TopGainer } from './topGainer';

@Injectable({ providedIn: 'root' })
export class TickerService {
  tickers: TopGainer[] = [];

  add(ticker: TopGainer) {
    this.tickers.push(ticker);
    console.log("")
  }

}
