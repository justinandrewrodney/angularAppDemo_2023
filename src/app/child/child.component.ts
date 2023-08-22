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

/*! \class ChildComponent
    \brief The child component recieves data from the Parent,
      renders the data to the user, and also recieves user input(button clicks.).
*/
export class ChildComponent implements OnInit {
  @Input() dailyDisplay: DisplayTicker = {date: '', ticker: '', close: ''};
  @Input() isDailyDisplayValid: boolean = true;
  @Input() errorMessage: string = '';

  constructor(
    protected tickerService: TickerService
    ) { }

  ngOnInit() {}


  /*! \fn selectTicker(value: string)
    \brief Sends the selected ticker to the parent.

    This is called whenever the user selects a ticker, so that
    the Parent can retrieve the information about this ticker.
  */
  @Output() selectedTickerEvent = new EventEmitter<string>();
  selectTicker(value: string){
    this.selectedTickerEvent.emit(value)
  }

  /*! \fn storeTickers(ticker: TopGainer)
    \brief Stores the ticker in the tickerService.
  */
  storeTickers(ticker: TopGainer){
    this.tickerService.add(ticker);
  }
}
