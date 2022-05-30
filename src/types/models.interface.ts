type CustomerId = string;
type OrderId = string;

export interface Customer {
  id: CustomerId;
  email: string;
  givenName: string;
  familyName: string;
}

export interface Order {
  id: OrderId;
  customerId: string;
  date: string;
}
