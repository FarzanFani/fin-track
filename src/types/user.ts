export type SignupForm = {
  fullName: string;
  date: string;
  email: string;
  password: string;
  confirmPass: string;
};
export type UserDatabaseWriteType = Omit<SignupForm, "confirmPass">;
export type UserDatabaseReadType = UserDatabaseWriteType & { id: string };
