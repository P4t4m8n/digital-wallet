import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactPreviewComponent } from './components/contact-preview/contact-preview.component';
import { InputComponent } from './components/input/input.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    InputComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactIndexComponent,
    HomeComponent,
    AppHeaderComponent,
    StatisticsComponent,
    LineChartComponent,
    BarChartComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
