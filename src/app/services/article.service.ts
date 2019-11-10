// app/core/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, ArticleAdapter } from '../article/article.model';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Service } from './service';

@Injectable()
export class ArticleService extends Service {

  private baseUrl = 'http://localhost:8080/articles';

  constructor(private http: HttpClient, private adapter: ArticleAdapter) { super(); }

  list(): Observable<Article[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get(url).pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map(item => this.adapter.adapt(item)))
    );
  }


  /* GET articles whose name contains search term */
  search(filter: string): Observable<Article[]> {
    const url = `${this.baseUrl}/`;
    if (!filter.trim()) {
      // if not search term, return empty articles array.
      return of([]);
    }
    return this.http.get<Article[]>(url).pipe(
      tap((response: Article[]) => {
        response = response
          .map(item => this.adapter.adapt(item))
          .filter(user => user.fullText.includes(filter));
        return response;
      }),
      catchError(this.handleError<Article[]>('searchCustomer', []))
    );
  }
}
