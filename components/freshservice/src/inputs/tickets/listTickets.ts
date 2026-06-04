import {
  additionalQueryParams,
  connection,
  fetchAll,
  page,
  perPage,
} from "../common";
import { filter } from "./common";

export const listTicketsInputs = {
  connection,
  filter,
  fetchAll,
  perPage,
  page,
  additionalQueryParams,
};
