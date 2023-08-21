import { Injectable, Output, Input, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { TickerService } from '../tickers.service';
import { TopGainers } from '../topGainers';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() ticker: string = '';
  @Input() close: string  = '';
  @Input() day: string  = '';

  constructor(
    protected tickerService: TickerService
    ) { }

  ngOnInit() {}

  // selected Ticker flows from child to parent
  @Output() selectedTickerEvent = new EventEmitter<string>();
  selectTicker(value: string){
    this.selectedTickerEvent.emit(value)
  }

  showTickers(ticker: TopGainers){
    this.tickerService.add(ticker);
  }
}
