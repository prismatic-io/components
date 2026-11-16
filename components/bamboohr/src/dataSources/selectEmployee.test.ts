import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { getEmployeeDirectoryExamplePayload } from "../examplePayloads";
import { BAMBOO_HOST, GATEWAY, testConnection } from "../testHelpers";
import { selectEmployee } from "./selectEmployee";

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

test("lists the directory's employees, not its field definitions", async () => {
  nock(BAMBOO_HOST)
    .get(`${GATEWAY}/v1/employees/directory`)
    .reply(200, getEmployeeDirectoryExamplePayload.data);
  const { result } = await invokeDataSource(selectEmployee, {
    connection: testConnection,
  });
  expect(result).toEqual([{ label: "John Doe", key: "123" }]);
});

test("falls back to first and last name when the directory has no display name", async () => {
  nock(BAMBOO_HOST)
    .get(`${GATEWAY}/v1/employees/directory`)
    .reply(200, {
      fields: [{ id: "firstName", type: "text", name: "First Name" }],
      employees: [
        { id: "7", firstName: "Ada", lastName: "Lovelace", canUploadPhoto: 0 },
      ],
    });
  const { result } = await invokeDataSource(selectEmployee, {
    connection: testConnection,
  });
  expect(result).toEqual([{ label: "Ada Lovelace", key: "7" }]);
});

test("labels an employee with no name fields by its ID", async () => {
  nock(BAMBOO_HOST)
    .get(`${GATEWAY}/v1/employees/directory`)
    .reply(200, { fields: [], employees: [{ id: "42", canUploadPhoto: 0 }] });
  const { result } = await invokeDataSource(selectEmployee, {
    connection: testConnection,
  });
  expect(result).toEqual([{ label: "Employee ID: 42", key: "42" }]);
});

test("returns an empty list when the directory has no employees", async () => {
  nock(BAMBOO_HOST)
    .get(`${GATEWAY}/v1/employees/directory`)
    .reply(200, { fields: [], employees: [] });
  const { result } = await invokeDataSource(selectEmployee, {
    connection: testConnection,
  });
  expect(result).toEqual([]);
});
