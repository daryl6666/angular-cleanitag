import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatSlideToggleModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatAutocompleteModule,
} from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routes';

import { OrderComponent } from './order/order.component';
import { CustomerService } from './services/customer.service';
import { CustomerAdapter} from './customer/customer.model';
import { CustomerFilterPipe } from './customer/customer-filter.pipe';
import { ArticleService } from './services/article.service';
import { ArticleAdapter } from './article/article.model';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { ArticleSearchComponent } from './article-search/article-search.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    OrderComponent,
    CustomerFilterPipe,
    CustomerSearchComponent,
    ArticleSearchComponent,
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CustomerAdapter, CustomerService, ArticleAdapter, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
