export class User {
  id: string;
  name: string;
  email: string;
  username = '';
  password = '';
  fullName = '';
}



export interface Sort {
  property: string;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
}

export interface PageModel {
  content: User[];
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort[];
}
