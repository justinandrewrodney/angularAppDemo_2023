
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JsonPlaceholder } from '../json-placeholder';
// import { ParentService } from './parent.service';
import { HttpClient } from '@angular/common/http';

//Helper for fake data.
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  jsonData: JsonPlaceholder | undefined;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.showConfig();
  }

  jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/todos/';
  
  showConfig() {

    let jsonPlaceholderUrl = this.jsonPlaceholderUrl+getRandomInt(1,200).toString();
    return this.http.get<JsonPlaceholder>(jsonPlaceholderUrl)
      .subscribe(
        (resp) => {
          console.log('Recieved JsonPlaceholer')
          console.log(resp)
        },
        (error) => {
          console.error('Failed to get JsonPlaceholder with error: ')
          alert(error)
        },
        () => {
          console.log('Request completed.')
        }
      );

  }
}
