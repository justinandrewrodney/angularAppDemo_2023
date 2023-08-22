import { Component, OnInit } from '@angular/core';

import { ParentService } from './parent.service';
import { ChildComponent } from '../child/child.component';

import { TopGainer } from '../topGainer';
import { DisplayTicker } from '../displayTicker';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
/*! \class ParentComponent
    \brief Uses the ParentService to retrieve data using a REST API,
      passes the data to the ChildComponent through function calls and event bindings.
*/
export class ParentComponent implements OnInit{
  selectedTickerData: DisplayTicker = {close: '', date: '', ticker: ''}
  displayDailyData: boolean = true
  errorMessage: string = ''


  constructor(
    private service: ParentService,
    private child: ChildComponent,
  ) { }
  ngOnInit() { this.getTickers() }

  /*! \fn getTickers()
      \brief Retrieves an array of 20 top gainers, and passes it to the Child.
  */
  getTickers() {
    this.service.getTopGainers()
      .subscribe((data: TopGainer[]) => {
        data.forEach(((ticker) => this.child.storeTickers(ticker)))
    })
  }

  /*! \fn getDailyDataForTicker(ticker: string)
    \brief Given a ticker, uses the parent service to get the closing price and date last updated
      to be sent to the child component via Event bindings.
  */
  getDailyDataForTicker(ticker: string){
    this.service.getMostRecentDailyData(ticker)
      .subscribe({
          next: (data: DisplayTicker) => {
            this.selectedTickerData = data
            this.displayDailyData=true
            this.errorMessage=''
          },
          error: (error: any) => {
            console.log(`Error getting daily data for ticker: ${ticker}`, error)
            this.selectedTickerData.close = ''
            this.selectedTickerData.date = ''
            this.selectedTickerData.ticker = ''
            this.displayDailyData=false
            this.errorMessage=`Cannot display daily closing price for ticker: ${ticker}`
          },
        })
  }

}
