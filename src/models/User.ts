export class User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;

  constructor(
    id: number,
    username: string,
    email: string,
    phone: string,
    address: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
