import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../utils";
import { connection } from "./shared";

const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. Page Size and Page Token inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

const lastModified = input({
  label: "Last Modified",
  type: "string",
  required: false,
  comments:
    "Limits the return data to restaurants that changed their access configuration for a partner API client after a specific date and time.",
  example: "2020-03-01T00:00:00.000-0000",
  placeholder: "2020-03-01T00:00:00.000-0000",
  clean: cleanStringInput,
});

export const listAccessibleRestaurantsInputs = {
  connection,
  lastModified,
};

const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "Controls the number of PartnerAccessExternalRep objects that the endpoint will return in each page of response data. The maximum page size is 200.",
  default: "100",
  example: "100",
  placeholder: "100",
  clean: cleanStringInput,
});

const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  comments:
    "Returns a specific set of restaurants in the response value. You get the token string for the next page of connected restaurants from the nextPageToken value of the PaginatedResponse object for a page of results.",
  example: "cDoyLHM6MQ==",
  placeholder: "cDoyLHM6MQ==",
  clean: cleanStringInput,
});

export const listConnectedRestaurantsInputs = {
  connection,
  lastModified: input({
    ...lastModified,
    comments:
      "Limits the return data to restaurants that changed their access configuration for your partner service after a specific date and time. You can use this parameter to identify new or updated restaurants connected to your partner service.",
  }),
  fetchAll,
  pageSize,
  pageToken,
};
