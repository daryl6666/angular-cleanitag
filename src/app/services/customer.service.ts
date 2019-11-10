// app/core/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerAdapter } from '../customer/customer.model';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Service } from './service';

@Injectable()
export class CustomerService extends Service {

  private baseUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient, private adapter: CustomerAdapter) { super(); }

  list(): Observable<Customer[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get(url).pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map(item => this.adapter.adapt(item)))
    );
  }


  /* GET customers whose name contains search term */
  search(filter: string): Observable<Customer[]> {
    const url = `${this.baseUrl}/`;
    if (!filter.trim()) {
      // if not search term, return empty customers array.
      return of([]);
    }
    return this.http.get<Customer[]>(url).pipe(
      tap((response: Customer[]) => {
        response = response
          .map(item => this.adapter.adapt(item))
          .filter(user => user.fullText.includes(filter));
        return response;
      }),
      catchError(this.handleError<Customer[]>('searchCustomer', []))
    );
  }

}
