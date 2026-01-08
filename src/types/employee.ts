export type Gender = "Male" | "Female" | "Other";

export interface Employee {
  id: string;
  name: string;
  gender: Gender;
  dob: string;
  state: string;
  active: boolean;
  image?: string;
}
