export interface CreateUserParams {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationalId: string;
    password: string;
    maritalStatus: "S" | "M";
  }