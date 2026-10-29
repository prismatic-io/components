import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { describeObjectExamplePayload } from "../../examplePayloads";
import { removeUserPermissionSet } from "./removeUserPermissionSet";

const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const BASE_PATH = `/services/data/v${DEFAULT_SF_VERSION}`;

const USER_ID = "0055g00000AbCdEAAZ";
const PERMISSION_SET_ID = "0PS5g00000FgHiJAAZ";
const ASSIGNMENT_ID = "0Pa5g00000KlMnOAAZ";
const USER_NAME = "jane@example.com";
const PERMISSION_NAME = "Sales_Ops";

const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);

const queryResult = (records: Array<{ Id: string }>) => ({
  totalSize: records.length,
  done: true,
  records,
});

const mockLookups = (assignmentRecords: Array<{ Id: string }>) => {
  const soql: string[] = [];
  const scope = nock(INSTANCE_URL)
    .get(/\/sobjects\/(User|PermissionSet|PermissionSetAssignment)\/describe$/)
    .times(3)
    .reply(200, describeObjectExamplePayload.data)
    .get(`${BASE_PATH}/query`)
    .query(true)
    .times(3)
    .reply(200, (uri) => {
      const q = new URL(uri, INSTANCE_URL).searchParams.get("q") ?? "";
      soql.push(q);
      if (/FROM PermissionSetAssignment /.test(q))
        return queryResult(assignmentRecords);
      if (/FROM PermissionSet /.test(q))
        return queryResult([{ Id: PERMISSION_SET_ID }]);
      return queryResult([{ Id: USER_ID }]);
    });
  return { scope, soql };
};

const inputs = {
  connection,
  version: DEFAULT_SF_VERSION,
  userName: USER_NAME,
  permissionName: PERMISSION_NAME,
};

describe("removeUserPermissionSet", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  test("scopes the PermissionSetAssignment lookup to the found user and deletes it", async () => {
    const { scope, soql } = mockLookups([{ Id: ASSIGNMENT_ID }]);
    const remove = nock(INSTANCE_URL)
      .delete(`${BASE_PATH}/sobjects/PermissionSetAssignment/${ASSIGNMENT_ID}`)
      .reply(204);

    const { result } = await invoke(removeUserPermissionSet, inputs);

    const assignmentQuery = soql.find((q) =>
      /FROM PermissionSetAssignment /.test(q),
    );
    expect(assignmentQuery).toContain(`AssigneeId = '${USER_ID}'`);
    expect(assignmentQuery).toContain(
      `PermissionSet.Name = '${PERMISSION_NAME}'`,
    );
    expect(scope.isDone()).toBe(true);
    expect(remove.isDone()).toBe(true);
    expect(result.data).toStrictEqual({
      id: ASSIGNMENT_ID,
      success: true,
      errors: [],
    });
  });

  test("throws when the user does not have the permission set assigned", async () => {
    const { scope } = mockLookups([]);

    await expect(invoke(removeUserPermissionSet, inputs)).rejects.toThrow(
      `User does not have "${PERMISSION_NAME}" assigned.`,
    );
    expect(scope.isDone()).toBe(true);
  });
});
