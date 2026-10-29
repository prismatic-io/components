import { connection } from "../common";
import {
  category,
  fieldDescription,
  fieldName,
  fieldType,
  historical,
} from "./common";

export const createNewFieldInputs = {
  connection,
  name: fieldName,
  category,
  type: fieldType,
  description: fieldDescription,
  historical,
};
