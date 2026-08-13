import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getDepartmentResponse } from "../../examplePayloads/departments";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getDepartment } from "./get";
const DEPARTMENT_ID = "c16b6ee1-2f5d-45e9-9fb4-c1c541a9ea70";
const PATH = apiPath(`/departments/${DEPARTMENT_ID}`);
describe("getDepartment", () => {
  afterEach(resetNock);
  test("returns the department the API replies with", async () => {
    rampNock().get(PATH).reply(200, getDepartmentResponse);
    const { result } = await invoke(getDepartment, {
      connection: testConnection,
      departmentId: DEPARTMENT_ID,
    });
    expect(result.data).toEqual(getDepartmentResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Department not found" } });
    await expect(
      invoke(getDepartment, {
        connection: testConnection,
        departmentId: DEPARTMENT_ID,
      }),
    ).rejects.toThrow();
  });
});
