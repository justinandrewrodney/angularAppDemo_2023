import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs'

import { ParentService } from './parent.service';
import { ChildComponent } from '../child/child.component';

import { TopGainer } from '../topGainer';
import { DisplayTicker } from '../displayTicker';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  selectedTickerData: DisplayTicker = {close: '', date: '', ticker: ''}
  displayDailyData: boolean = true
  errorMessage: string = ''


  constructor(
    private service: ParentService,
    private child: ChildComponent,
  ) { }
  ngOnInit() { this.getTickers() }

  getTickers() {
    this.service.getTopGainers()
      .subscribe((data: TopGainer[]) => {
        data.forEach(((ticker) => this.child.storeTickers(ticker)))
    })
  }

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
