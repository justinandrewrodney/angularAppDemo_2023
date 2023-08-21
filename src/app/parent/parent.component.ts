import { Component, OnInit } from '@angular/core';

import { ParentService } from './parent.service';
import { ChildComponent } from '../child/child.component';

import { TopGainers } from '../topGainers';
import { Daily } from '../daily';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  selectedTicker: string = ''
  selectedClose: string  = ''
  selectedDay: string  = ''

  constructor(
    private service: ParentService,
    private child: ChildComponent,
  ) { }
  ngOnInit() { this.getTickers() }

  getTickers() {
    this.service.getTopGainers()
      .subscribe((data: TopGainers[]) => {
        data.forEach(((ticker) => this.child.showTickers(ticker)))
    })
  }

  getDailyData(ticker: string){
    this.service.getDaily(ticker)
      .subscribe((data: any) => {
        // This solution assumes the first element is going to be 
        // the most recent date. This is fragile, but quick solution.
        let mostRecentDayKey  = Object.keys(data)[0];
        let mostRecentDayData = data[mostRecentDayKey];

        let dailyRecent: Daily = {
          ticker: ticker,
          close:  mostRecentDayData["4. close"],
          volume: mostRecentDayData["5. volume"]
        };
        // This gets sent to the child components input variables.
        this.selectedTicker = dailyRecent.ticker
        this.selectedClose  = dailyRecent.close
        this.selectedDay    = mostRecentDayKey

      },
      (err: any) => {
        console.log("getDailyData", err)
      }
      )
  }

}
