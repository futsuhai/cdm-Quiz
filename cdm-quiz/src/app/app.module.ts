import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './components/routing/app-routing.module';
import { AppComponent } from './app.component';
import { PopupComponent } from './components/popup/popup.component';
import { StartComponent } from './components/start/start.component';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { QuestionsComponent } from './components/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    QuestionsComponent,
    StartComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSwitch,
    NgSwitchCase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
