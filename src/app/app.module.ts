import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// For ParentComponent
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
