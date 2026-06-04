import {
  connectionInput,
  marketplaceId,
  page,
  pageSize,
  sortBy,
  sortDir,
  tagId,
} from "../../common";
import { countryCode, stateCode } from "../../customers/common";

export const selectCustomersInputs = {
  stateCode,
  countryCode,
  marketplaceId,
  tagId,
  sortBy,
  sortDir,
  page,
  pageSize,
  connectionInput,
};
