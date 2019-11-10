import { Component, OnInit, } from '@angular/core';
import { Customer } from '../customer/customer.model';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  customer: Customer;
  articles: Article[] = [];
  test: string;
  arrowkeyLocation = 0;
  constructor() { }
  ngOnInit() {
  }
  onCustomerSelected(customer: Customer) {
    this.customer = customer;
  }

  onArticleSelected(article: Article) {
    this.articles.push(article);
  }

  delete(article: Article) {
    const index: number = this.articles.indexOf(article);
    if (index !== -1) {
      this.articles.splice(index, 1);
    }
  }

  keyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
        case 38: // this is the ascii of arrow up
                 this.arrowkeyLocation--;
                 break;
        case 40: // this is the ascii of arrow down
                 this.arrowkeyLocation++;
                 break;
    }
}
}
