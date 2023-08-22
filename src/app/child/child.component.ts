import { Injectable, Output, Input, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { TickerService } from '../tickers.service';
import { TopGainer } from '../topGainer';
import { DisplayTicker } from '../displayTicker';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() dailyDisplay: DisplayTicker = {date: '', ticker: '', close: ''};
  @Input() isDailyDisplayValid: boolean = true;
  @Input() errorMessage: string = '';

  constructor(
    protected tickerService: TickerService
    ) { }

  ngOnInit() {}

  // selected Ticker flows from child to parent
  @Output() selectedTickerEvent = new EventEmitter<string>();
  selectTicker(value: string){
    this.selectedTickerEvent.emit(value)
  }

  storeTickers(ticker: TopGainer){
    this.tickerService.add(ticker);
  }
}
