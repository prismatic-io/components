import {
  accountKey,
  connection,
  fetchAll,
  fromTime,
  pageNumber,
  pageSize,
  toTime,
} from "../general";
import { toOptionalString } from "../../utils";

export const getWebinarInputs = {
  connection,
  fetchAll,
  accountKey: {
    ...accountKey,
    clean: toOptionalString,
    required: false,
    comments:
      "The key of the account. If using this input instead of " +
      "the organizer key, the action will retrieve the webinars by Account Key",
  },
  fromTime,
  toTime,
  page: pageNumber,
  size: pageSize,
};
