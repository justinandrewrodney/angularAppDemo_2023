import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'


import { TopGainers } from '../topGainers';
import * as config from '../../assets/config.json'


@Injectable({
providedIn: 'root',
})
export class ParentService {
    baseUrl: string = 'https://www.alphavantage.co/'
    private conf = config
    apiKey: string  = this.conf['API_KEY']

  constructor(private http: HttpClient) { }

    getTopGainers(){
        let functionUrl = 'query?function=TOP_GAINERS_LOSERS'
        let url: string = `${this.baseUrl}${functionUrl}&apikey=${this.apiKey}`;

        return this.http.get<TopGainers[]>(url)
            .pipe(map( (res: any) => res.top_gainers
                .map( (tg: TopGainers ) => <TopGainers>{
                                                ticker: tg.ticker,
                                                price: tg.price,
                                                change_amount: tg.change_amount,
                                                change_percentage: tg.change_percentage,
                                                volume: tg.volume
                                            },
                        catchError((error: any) => {
                            console.log("Error getting daily.", error)
                            throw new Error(error)
                        })
                )
            ))
    }

    // TODO: Need to add a way to query for tickers with special characters('+')
    getDaily(ticker: string): any{
        let functionUrl = `query?function=TIME_SERIES_DAILY&symbol=${ticker}`
        let url: string = `${this.baseUrl}${functionUrl}&apikey=${this.apiKey}`;

        return this.http.get(url)
            .pipe(map( (res: any) => res['Time Series (Daily)']))
    }
}