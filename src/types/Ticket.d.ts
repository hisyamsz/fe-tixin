export interface ITicket {
  _id?: string;
  name?: string;
  events?: string;
  price?: number | string;
  description?: string;
  quantity?: number | string;
}

export interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}
