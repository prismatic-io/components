import { util } from "@prismatic-io/spectral";
import { DATE_ONLY_PATTERN } from "../constants";

export const toIsoDate = (value: string): Date =>
  util.types.toDate(
    DATE_ONLY_PATTERN.test(value) ? `${value}T00:00:00Z` : value,
  );
