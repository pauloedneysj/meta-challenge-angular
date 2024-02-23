export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IUserData {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IUserUpdateData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IProductResponse {
  id: string;
  userId: string;
  name: string;
  code: string;
  sent: boolean;
  createdAt: string;
}

export interface IProductData {
  userId: string;
  name: string;
  code: string;
}
