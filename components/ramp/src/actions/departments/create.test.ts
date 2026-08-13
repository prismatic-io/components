import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getDepartmentResponse } from "../../examplePayloads/departments";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { createDepartment } from "./create";
const PATH = apiPath("/departments");
describe("createDepartment", () => {
  afterEach(resetNock);
  test("sends the name as the whole request body and returns the created department", async () => {
    rampNock()
      .post(PATH, { name: "Bookkeeping" })
      .reply(200, getDepartmentResponse);
    const { result } = await invoke(createDepartment, {
      connection: testConnection,
      name: "Bookkeeping",
    });
    expect(result.data).toEqual(getDepartmentResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .post(PATH)
      .reply(422, { error: { message: "name is required" } });
    await expect(
      invoke(createDepartment, {
        connection: testConnection,
        name: "Bookkeeping",
      }),
    ).rejects.toThrow();
  });
});
