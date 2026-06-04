import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { createTableRecord } from "./actions/tables/records/createTableRecord";
import { basic } from "./connections";


const instanceUrlInput = "REDACTED";
const apiVersionInput = "latest";
const connection = createConnection(basic, {
  username: "REDACTED",
  password: "REDACTED",
});

describe("createTableRecordAction", () => {
  test("ensure returns expected result", async () => {
    if (instanceUrlInput === "REDACTED") {
      return;
    }

    const tableNameInput = "incident";
    const testValue = "Test 123";
    const fieldValuesInput = [{ key: "short_description", value: testValue }];

    const { result } = await invoke(createTableRecord, {
      connection,
      instanceUrlInput,
      apiVersionInput,
      tableNameInput,
      fieldValuesInput,
    });

    expect(result.data.short_description).toStrictEqual(testValue);
  });
});
