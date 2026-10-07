import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { contentfulOauth2Connection } from "./connections";
import { API_BASE_URL, API_UPLOAD_URL } from "./constants";
export const BASE = API_BASE_URL;
export const UPLOAD_BASE = API_UPLOAD_URL;
export const ACCESS_TOKEN = "test-access-token";
export const connection = createConnection(
  contentfulOauth2Connection,
  {},
  { access_token: ACCESS_TOKEN },
);
export const asCollection = <T>(
  items: T[],
  { total = items.length, skip = 0, limit = 100 } = {},
) => ({
  sys: { type: "Array" },
  total,
  skip,
  limit,
  items,
});
export const useNock = (): void => {
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
};
