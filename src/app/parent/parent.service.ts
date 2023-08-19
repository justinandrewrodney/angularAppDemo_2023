import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { JsonPlaceholder } from '../json-placeholder';

@Injectable({
providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) { }

  getJson(url: string): Observable<HttpResponse<JsonPlaceholder>> {
    return this.http.get<JsonPlaceholder>(url, { observe: 'response' });
  }
}