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
  constructor(
    private service: ParentService,
    private child: ChildComponent,
  ) { }
  ngOnInit() { this.getTickers() }

  getTickers() {
    this.service.getTopGainers()
      .subscribe((data: TopGainers[]) => {
        data.forEach(((ticker) => this.child.showTickers(ticker)))

          console.log({ data })

    })
  }

  getDailyData(ticker: string){
    this.service.getDaily(ticker)
      .subscribe((data: any) => {
        let mostRecentDayKey  = Object.keys(data)[0];
        let mostRecentDayData = data[mostRecentDayKey];

        let dailyRecent: Daily = {
          ticker: ticker,
          close:  mostRecentDayData["4. close"],
          volume: mostRecentDayData["5. volume"]
        };
        console.log( dailyRecent );

        // This gets sent to the child components input variables.
        this.selectedTicker = dailyRecent.ticker
        this.selectedClose  = dailyRecent.close
      })
  }

}
