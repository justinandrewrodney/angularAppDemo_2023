import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { JsonPlaceholder } from '../json-placeholder';
import { JsonPlaceholderService } from '../json-placeholder.service';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  
  constructor(
    protected jsonPlaceholderService: JsonPlaceholderService
  ) { }

  ngOnInit() {}

  logJsonPlaceholder(jsonPlaceholder: JsonPlaceholder){
    this.jsonPlaceholderService.add(jsonPlaceholder);
  }
}
