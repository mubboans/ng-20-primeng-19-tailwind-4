export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: 'male' | 'female';
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  role?: 'admin' | 'user';
}
