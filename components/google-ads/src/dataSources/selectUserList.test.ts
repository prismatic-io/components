import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { dataManagerOAuth } from "../connections";
import {
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_BASE_URL,
} from "../constants";
import { selectUserList } from "./selectUserList";

const connection = createConnection(
  dataManagerOAuth,
  {},
  { access_token: "test-access-token" },
);

const PATH = `/${GOOGLE_DATA_MANAGER_API_VERSION}/accountTypes/GOOGLE_ADS/accounts/1234567890/userLists`;
const ingested = { uploadKeyTypes: ["CONTACT_ID"] };

describe("selectUserList", () => {
  afterEach(() => nock.cleanAll());

  test("pages through, keeps writable uploaded lists and sorts by label", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .get(PATH)
      .reply(200, {
        userLists: [
          {
            id: "3",
            displayName: "Zeta Buyers",
            ingestedUserListInfo: ingested,
          },
          { id: "4", displayName: "Website Visitors" },
        ],
        nextPageToken: "next",
      })
      .get(PATH)
      .query({ pageToken: "next" })
      .reply(200, {
        userLists: [
          {
            id: "1",
            displayName: "Alpha Leads",
            ingestedUserListInfo: ingested,
          },
          {
            id: "2",
            displayName: "Shared List",
            readOnly: true,
            ingestedUserListInfo: ingested,
          },
          { id: "5", ingestedUserListInfo: ingested },
        ],
      });

    const { result } = await invokeDataSource(selectUserList, {
      connection,
      customerId: "1234567890",
      managerCustomerId: undefined,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "5", key: "5" },
      { label: "Alpha Leads - 1", key: "1" },
      { label: "Zeta Buyers - 3", key: "3" },
    ]);
  });

  test("names the manager in the login-account header", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL, {
      reqheaders: {
        "login-account": "accountTypes/GOOGLE_ADS/accounts/6423032672",
      },
    })
      .get(PATH)
      .reply(200, { userLists: [] });

    await invokeDataSource(selectUserList, {
      connection,
      customerId: "1234567890",
      managerCustomerId: "6423032672",
    });

    expect(scope.isDone()).toBe(true);
  });

  test("returns an empty list when the customer has no audiences", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .get(PATH)
      .reply(200, { userLists: [] });

    const { result } = await invokeDataSource(selectUserList, {
      connection,
      customerId: "1234567890",
      managerCustomerId: undefined,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([]);
  });
});
