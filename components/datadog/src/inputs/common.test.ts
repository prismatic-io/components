import type { Connection } from "@prismatic-io/spectral";
import { connection } from "./common";
describe("connection.clean", () => {
  test("passes the connection value through unchanged", () => {
    const value: Connection = {
      key: "apiKey",
      configVarKey: "",
      fields: {
        datadogSite: "https://api.datadoghq.com",
        apiKey: "test-api-key",
        applicationKey: "test-application-key",
      },
    };
    expect(connection.clean(value)).toBe(value);
  });
});
