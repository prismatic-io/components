import sendLogs from "./actions/sendLogs";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import { apiKeySecret } from "./connections";

describe("test Send Logs", () => {
  test("verify the return value of my action", async () => {
    const { result } = await invoke(sendLogs, {
      jsonMessage:
        '{"service-name": "my-service", "user": {"id": 123, "name": "alice"}}',
      timestamp: "1562767499238",
      newRelicConnection: createConnection(apiKeySecret, {}),
    });
    expect(result.data);
  });
});
