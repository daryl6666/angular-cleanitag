import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Article } from '../article/article.model';
import { ArticleService } from '../services/article.service';
import { debounceTime, distinctUntilChanged, switchMap, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
  public filteredArticleList$: Observable<Article[]>;
  private searchTerms = new Subject<string>();
  public selectedArticle: Article;
  public arrowkeyLocation = 0;
  @Output() articleSearchSelectedArticle = new EventEmitter<Article>();
  constructor(public articleService: ArticleService) { }


  ngOnInit() {
    this.filteredArticleList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.articleService.search(term)),
    );
  }

  articleSearch(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
    this.articleSearchSelectedArticle.emit(article);
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
        this.onSelect(this.filteredArticleList$[this.arrowkeyLocation]);
        break;
    }
  }
}
