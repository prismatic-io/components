import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msEntraIdOauth2 } from "./connections";
import { API_URL } from "./constants";

nock.disableNetConnect();

export const ACCESS_TOKEN = "test-access-token";

export const API_PATH = new URL(API_URL).pathname;

export const connection = createConnection(
  msEntraIdOauth2,
  {},
  { access_token: ACCESS_TOKEN },
);

export const graphError = {
  error: {
    code: "Request_ResourceNotFound",
    message:
      "Resource does not exist or one of its queried reference-property objects are not present.",
  },
};

export const emptyOdataQueryParams = {
  $count: false,
  $expand: undefined,
  $filter: undefined,
  $orderby: undefined,
  $search: undefined,
  $select: undefined,
  $top: undefined,
};

export const mockGraph = () =>
  nock(new URL(API_URL).origin, {
    reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
  });

export const resetNock = () => {
  nock.cleanAll();
};
