import { Adapter } from '../helper/adapter';
export class Article {
	constructor(
		public id: number,
		public name: string,
		public code: string,
		public price: number,
		public fullText: string,
	) { }
}


export class ArticleAdapter implements Adapter<Article> {

	adapt(item: any): Article {
		return new Article(
			item.id,
			item.name,
			item.code,
			item.price,
			item.id + ' ' + item.name + ' ' + item.code + ' ' + item.price,
		);
	}
}
