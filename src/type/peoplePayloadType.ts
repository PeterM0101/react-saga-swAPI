import { Person } from "./person";

export interface PeoplePayloadType {
  page?: number;
  search?: string;
}

export interface DataType {
  results: Person[];
  count: number;
  next: string;
  previous: string;
}
