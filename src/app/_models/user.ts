import { Binary } from "@angular/compiler";

export class User {
  id: number;
  name: string;
  email: string;
  token: string;
  lang: string;
  isAdmin: boolean;
  address: string;
  has_avatar: boolean
  avatar_url: string;
  phone: string;
  has_apple_login: boolean;
  has_google_login: boolean;
  is_admin: boolean;
  is_superadmin: boolean;
  company: Company;
}

export class Company {
  id: number;
  name: string;
  billing_id: string;
  billing_name: string;
  has_logo: boolean;
  logo_url: string;
}