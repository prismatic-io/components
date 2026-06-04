import {
  connectionInput,
  marketplaceId,
  page,
  pageSize,
  sortBy,
  sortDir,
  tagId,
} from "../common";
import { countryCode, stateCode } from "./common";

export const listCustomersInputs = {
  connectionInput,
  stateCode,
  countryCode,
  marketplaceId,
  tagId,
  sortBy,
  sortDir,
  page,
  pageSize,
};
