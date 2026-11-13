import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import { searchUserExamplePayload } from "../../examplePayloads";
import { searchUser } from "./searchUser";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("searchUser", () => {
  test("returns the user", async () => {
    nock(BASE_URL)
      .get(`/users/${USER_ID}`)
      .reply(200, searchUserExamplePayload.data);

    const { result } = await invoke(searchUser, {
      connection,
      userId: USER_ID,
    });

    expect(result).toEqual(searchUserExamplePayload);
  });

  test("rejects when the user does not exist", async () => {
    nock(BASE_URL)
      .get(`/users/${USER_ID}`)
      .reply(404, {
        error: { code: "Request_ResourceNotFound", message: "Not found" },
      });

    await expect(
      invoke(searchUser, { connection, userId: USER_ID }),
    ).rejects.toThrow("Status: 404 code: Request_ResourceNotFound");
  });
});
