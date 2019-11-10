import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return it.fullText.toLowerCase().includes(searchText);
        });
   }
  search( items: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return it.fullText.toLowerCase().includes(searchText);
        });
  }
}
