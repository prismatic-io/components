import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The NetSuite connection to use.",
});

export const limitInput = input({
  label: "Pagination Limit",
  type: "string",
  comments:
    "The maximum number of records to fetch per page. See [Record Collection Filtering](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545222128.html) for details.",
  default: "1000",
  example: "1000",
  placeholder: "Enter pagination limit",
  required: true,
  clean: (value) => util.types.toNumber(value, 1000),
});

export const offsetInput = input({
  label: "Pagination Offset",
  type: "string",
  comments:
    "The number of records to skip before starting to fetch results. Used for pagination.",
  example: "0",
  placeholder: "Enter pagination offset",
  required: false,
  clean: util.types.toNumber,
});
