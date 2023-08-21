# AngularApp
This application demonstrates a basic use of the HttpClientModule, by using the [alphavantage REST API](https://www.alphavantage.co/documentation/)*. The application pulls top 20 'gainers' and displays them to the user. Upon clicking on any of the tickers, the last daily closing price will be displayed alongside the ticker and date. The application does not currently support displaying information for tickers with non-alphabetical characters.

\***Note**: you will need an alphavantage (free) [API key](https://www.alphavantage.co/support/#api-key), which should be placed in `src\assets\config.json`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.
