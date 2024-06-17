export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserData extends Omit<User, 'id'> {
  username: string;
}

export interface UserEdit {
  name: string;
  phone: string;
}
