import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { updateEmployeeTableRowExamplePayload } from "../../examplePayloads";
import { BAMBOO_HOST, GATEWAY, testConnection } from "../../testHelpers";
import { updateEmployeeTableRow } from "./updateEmployeeTableRow";

const ROW = { jobTitle: "Staff Developer" };

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

test("posts the changes to the v1_1 table row endpoint and returns the response", async () => {
  const scope = nock(BAMBOO_HOST)
    .post(`${GATEWAY}/v1_1/employees/42/tables/jobInfo/15`, ROW)
    .reply(200, updateEmployeeTableRowExamplePayload.data);
  const { result } = await invoke(updateEmployeeTableRow, {
    connection: testConnection,
    employeeId: "42",
    tableName: "jobInfo",
    rowId: "15",
    tableFieldValues: ROW,
  });
  expect(result).toEqual(updateEmployeeTableRowExamplePayload);
  expect(scope.isDone()).toBe(true);
});

test("surfaces BambooHR's rejection detail when a list value does not match", async () => {
  nock(BAMBOO_HOST)
    .post(`${GATEWAY}/v1_1/employees/42/tables/jobInfo/15`, ROW)
    .reply(400, "", {
      "X-BambooHR-Error-Message": 'Couldn\'t find jobTitle: "Staff Developer"',
    });
  await expect(
    invoke(updateEmployeeTableRow, {
      connection: testConnection,
      employeeId: "42",
      tableName: "jobInfo",
      rowId: "15",
      tableFieldValues: ROW,
    }),
  ).rejects.toThrow(
    'Request failed with status code 400: Couldn\'t find jobTitle: "Staff Developer"',
  );
});
