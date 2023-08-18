// From: https://angular.io/guide/http-server-communication
// Using https://jsonplaceholder.typicode.com/
//{
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JsonPlaceholder } from '../json-placeholder';

@Injectable()
export class ParentService {
  constructor(private http: HttpClient) { }

  jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/';

  getJson() {
  return this.http.get<JsonPlaceholder>(this.jsonPlaceholderUrl);
  }
  getJsonResponse(): Observable<HttpResponse<JsonPlaceholder>> {
    return this.http.get<JsonPlaceholder>(
            this.jsonPlaceholderUrl,
            { observe: 'response'}
        );
    }
}
*/