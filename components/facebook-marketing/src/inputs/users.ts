import { myConnectionField, userId, version } from "./common";
export const getCurrentUserInputs = {
  connection: myConnectionField,
  version,
};
export const getUserByIdInputs = {
  connection: myConnectionField,
  userId,
  version,
};
