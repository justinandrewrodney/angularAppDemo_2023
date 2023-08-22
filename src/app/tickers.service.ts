import { Injectable } from '@angular/core';
import { TopGainer } from './topGainer';

@Injectable({ providedIn: 'root' })
/*! \class TickerService
    \brief Acts as a local db for tickers.
*/
export class TickerService {
  tickers: TopGainer[] = [];

  add(ticker: TopGainer) {
    this.tickers.push(ticker);
    console.log("")
  }

}
