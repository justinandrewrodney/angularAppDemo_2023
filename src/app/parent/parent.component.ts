import { Component, OnInit } from '@angular/core';

import { ParentService } from './parent.service';
import { JsonPlaceholder } from '../json-placeholder';
import { ChildComponent } from '../child/child.component';

//Helper for fake data.
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max-min+1) + min);
}


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{

  constructor(
    private service: ParentService,
    private child: ChildComponent
  ) { }
  ngOnInit() {  }

  jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/todos/';
  
  getAndStoreJsonData() {
    // Randomize which placeholder we are pulling at each call.
    let jsonPlaceholderUrl = this.jsonPlaceholderUrl+getRandomInt(1,200).toString();

    this.service.getJson(jsonPlaceholderUrl)
      .subscribe(resp => {

        let jsonData: JsonPlaceholder = { ...resp.body! }
        console.log(jsonData)
        this.child.logJsonPlaceholder(jsonData)
      }
      );
  }
}
