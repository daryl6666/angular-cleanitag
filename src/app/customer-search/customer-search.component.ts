import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../services/customer.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  @Output() customerSearchSelectedCustomer = new EventEmitter<Customer>();
  public filteredCustomerList$: Observable<Customer[]> = new Observable<Customer[]>();
  private searchTerms = new Subject<string>();
  selectedCustomer: Customer;
  private arrowkeyLocation = 0;
  constructor(public customerService: CustomerService) { }

  ngOnInit() {
    this.fillList();
  }

  customerSearch(term: string): void {
    this.searchTerms.next(term);
  }

  //   onKeydownCustomerSearch(event: any) {
  //   console.log(event);
  //   if (this.customerForm.get('customerSearchInput').value) {
  //     console.log('whatever');
  //   }

  // }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
    this.fillList();
    this.customerSearchSelectedCustomer.emit(customer);
  }

  clearList() {
    this.filteredCustomerList$ = new Observable<Customer[]>();
  }

  fillList() {
    this.filteredCustomerList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.search(term)),
    );
  }




  keyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // this is the ascii of arrow up
        this.arrowkeyLocation--;
        break;
      case 40: // this is the ascii of arrow down
        this.arrowkeyLocation++;
        break;
      case 13:
        this.onSelect(this.filteredCustomerList$[this.arrowkeyLocation]);
        break;
    }
  }
}
