import { Injectable } from '@angular/core';
import { TopGainers } from './topGainers';

@Injectable({ providedIn: 'root' })
export class TickerService {
  tickers: TopGainers[] = [];

  add(ticker: TopGainers) {
    this.tickers.push(ticker);
    console.log("")
  }

}
