import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getDepartmentResponse } from "../../examplePayloads/departments";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { updateDepartment } from "./update";
const DEPARTMENT_ID = "c16b6ee1-2f5d-45e9-9fb4-c1c541a9ea70";
const PATH = apiPath(`/departments/${DEPARTMENT_ID}`);
describe("updateDepartment", () => {
  afterEach(resetNock);
  test("sends the name in the body with the ID in the path and returns the update", async () => {
    rampNock()
      .patch(PATH, { name: "Accounting" })
      .reply(200, { ...getDepartmentResponse, name: "Accounting" });
    const { result } = await invoke(updateDepartment, {
      connection: testConnection,
      departmentId: DEPARTMENT_ID,
      name: "Accounting",
    });
    expect(result.data).toEqual({
      ...getDepartmentResponse,
      name: "Accounting",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "Department not found" } });
    await expect(
      invoke(updateDepartment, {
        connection: testConnection,
        departmentId: DEPARTMENT_ID,
        name: "Accounting",
      }),
    ).rejects.toThrow();
  });
});
