import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'


import { TopGainer } from '../topGainer';
import * as config from '../../assets/config.json'
import { DisplayTicker } from '../displayTicker';


@Injectable({
providedIn: 'root',
})
/*! \class ParentService
    \brief Implements the HttpClient calls to alphavantage REST API
*/
export class ParentService {
    baseUrl: string = 'https://www.alphavantage.co/'
    private conf = config
    apiKey: string  = this.conf['API_KEY']

  constructor(private http: HttpClient) { }

    /*! \fn void getTopGainers()
        \brief Makes the http & map calls to retrieve the 20 top gainers.
    */
    getTopGainers(): Observable<TopGainer[]> {
        let functionUrl = 'query?function=TOP_GAINERS_LOSERS'
        let url: string = `${this.baseUrl}${functionUrl}&apikey=${this.apiKey}`;

        return this.http.get<TopGainer[]>(url)
            .pipe(map( (res: any) => res.top_gainers
                .map( (tg: TopGainer ) => <TopGainer>{
                                                ticker: tg.ticker,
                                                price: tg.price,
                                                change_amount: tg.change_amount,
                                                change_percentage: tg.change_percentage,
                                                volume: tg.volume
                                            },
                        )
                ),
                catchError((error: any) => {
                    console.log("Error getting topGainers.", error)
                    throw new Error(error)
                })
            )
    }

    /*! \fn void getMostRecentDailyData(ticker: string)
        \brief Makes the call to retrieve the TIME_SERIES_DAILY data for the specified ticker.

        \param ticker: A string specifying the ticker used in the HTTP get call.
    */
    // TODO: Need to add a way to query for tickers with special characters('+')
    // getMostRecentDailyData(ticker: string): Observable<any> {
    getMostRecentDailyData(ticker: string): Observable<DisplayTicker> {
        let functionUrl = `query?function=TIME_SERIES_DAILY&symbol=${ticker}`
        let url: string = `${this.baseUrl}${functionUrl}&apikey=${this.apiKey}`;

        // return this.http.get<any>(url)
        return this.http.get<DisplayTicker>(url)
            .pipe(map( (res: any) => {
                        let dailyKeys = Object.keys(res['Time Series (Daily)'])

                        // This solution assumes the first element is going to be
                        // the most recent date. This is fragile, but quick solution.
                        let mostRecentDayKey  = dailyKeys[0]
                        let mostRecentDayData = res['Time Series (Daily)'][mostRecentDayKey];

                        let dailyRecent: DisplayTicker = {
                          ticker: ticker,
                          close:  mostRecentDayData["4. close"],
                          date:   mostRecentDayKey
                        };
                        return dailyRecent
                    }
                ),
                catchError((error: any) => {
                    console.log("Error getting daily.", error)
                    throw new Error(error)
                })
            )
    }
}