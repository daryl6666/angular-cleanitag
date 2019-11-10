
import { Adapter } from '../helper/adapter';

export class Customer {
	[x: string]: any;
	constructor(
		public id: number,
		public lastName: string,
		public firstName: string,
		public street: string,
		public streetNumber: string,
		public city: string,
		public postalCode: string,
		public fullText: string,
	) { }
}


export class CustomerAdapter implements Adapter<Customer> {

	adapt(item: any): Customer {
		return new Customer(
			item.id,
			item.lastName,
			item.firstName,
			item.street,
			item.streetNumber,
			item.city,
			item.postalCode,
			item.id + ' ' + item.lastName + ' ' + item.firstName + ' ' + item.street + ' ' + item.streetNumber + ' ' + item.city + ' ' + item.postalCode
		);
	}
}


export interface ICustomerResponse {

	customers: Customer[];
}
