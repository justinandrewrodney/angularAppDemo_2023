import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators'

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
      .subscribe(
          (data: DisplayTicker) => {
            this.selectedTickerData = data
          },
          (error: any) => {
            console.log(`Error getting daily data for ticker: ${ticker}`, error)
            this.selectedTickerData.close = ''
            this.selectedTickerData.date = ''
            this.selectedTickerData.ticker = ''
          },
      )
  }

}
