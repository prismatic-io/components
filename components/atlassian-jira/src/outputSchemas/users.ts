import { userSchema } from "./common";

export const createUserOutputSchema = userSchema;

export const findUserOutputSchema = {
  type: "array",
  items: userSchema,
};

export const searchUsersOutputSchema = {
  type: "array",
  items: userSchema,
};

export const getCurrentUserOutputSchema = userSchema;

export const getUserOutputSchema = userSchema;

export const listAssignableUsersOutputSchema = {
  type: "array",
  items: userSchema,
};
