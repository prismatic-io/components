import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { addEmployeeTableRowExamplePayload } from "../../examplePayloads";
import { BAMBOO_HOST, GATEWAY, testConnection } from "../../testHelpers";
import { addEmployeeTableRow } from "./addEmployeeTableRow";

const ROW = { date: "2024-01-15", jobTitle: "Senior Developer" };

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

test("posts the row to the v1_1 table endpoint and returns the confirmation", async () => {
  const scope = nock(BAMBOO_HOST)
    .post(`${GATEWAY}/v1_1/employees/42/tables/jobInfo`, ROW)
    .reply(200, "");
  const { result } = await invoke(addEmployeeTableRow, {
    connection: testConnection,
    employeeId: "42",
    tableName: "jobInfo",
    tableFieldValues: ROW,
  });
  expect(result).toEqual(addEmployeeTableRowExamplePayload);
  expect(scope.isDone()).toBe(true);
});

test("surfaces BambooHR's rejection detail when a list value does not match", async () => {
  nock(BAMBOO_HOST)
    .post(`${GATEWAY}/v1_1/employees/42/tables/jobInfo`, ROW)
    .reply(400, "", {
      "X-BambooHR-Error-Message": 'Couldn\'t find jobTitle: "Senior Developer"',
    });
  await expect(
    invoke(addEmployeeTableRow, {
      connection: testConnection,
      employeeId: "42",
      tableName: "jobInfo",
      tableFieldValues: ROW,
    }),
  ).rejects.toThrow(
    'Request failed with status code 400: Couldn\'t find jobTitle: "Senior Developer"',
  );
});
