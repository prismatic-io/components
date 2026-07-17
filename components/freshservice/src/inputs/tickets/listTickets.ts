import {
  additionalQueryParams,
  connection,
  fetchAll,
  pagination,
} from "../common";
import { filter } from "./common";
export const listTicketsInputs = {
  connection,
  filter,
  fetchAll,
  pagination,
  additionalQueryParams,
};
