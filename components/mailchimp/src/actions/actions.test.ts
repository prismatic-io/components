import component from "..";
import { mailchimpConnection } from "../connections";
import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";

const harness = createHarness(component);
const myApiKey = createConnection(mailchimpConnection, {
  apiKey: process.env.MAILCHIMP_API_KEY,
});

describe("Test the server ping endpoint", () => {
  test("Server ping", async () => {
    const result = await harness.action("ping", { connection: myApiKey });
    expect(result.data).toStrictEqual({
      health_status: "Everything's Chimpy!",
    });
  });
});
