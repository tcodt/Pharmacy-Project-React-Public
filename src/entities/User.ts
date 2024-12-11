export interface User {
  id: number
  first_name: string;
  last_name: string;
  phoneNumber: string;
  national_id: string;
  password: string;
  image: string;
  is_superuser: boolean,
  is_active: boolean,
  is_staff: boolean,
}