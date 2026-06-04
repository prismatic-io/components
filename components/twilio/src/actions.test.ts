import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import { sendSMS } from "./actions/sms";
import { twilioApiKeyConnection } from "./connections";

describe("test SMS action", () => {
  test("verify the query action works as expected", async () => {
    const connection = createConnection(twilioApiKeyConnection, {
      apiKey: "ACfb9a191ee66d28f302a26a4032efe535",
      apiSecret: "edd5cdc0c694c95a28f941195434de46",
    });

    const to = "16059313845";
    const from = "15005550006";
    const message = "myMessage";
    const { result } = await invoke(
      sendSMS,
      {
        to,
        from,
        message,
        twilioConnection: connection,
      },
      {},
    );
    expect(result.data).toHaveProperty("status");
  });
});
