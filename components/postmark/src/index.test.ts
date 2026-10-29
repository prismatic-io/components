import rawRequest from "./actions/rawRequest";
import { postmarkConnection } from "./connections";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";

describe("test Postmark rawRequest action", () => {
  test("verify the return value of rawRequest action", async () => {
    const { result } = await invoke(rawRequest, {
      connection: createConnection(postmarkConnection, {
        accountToken: "767e0067-8d95-433c-8edd-a689a6aeef6b",
        serverToken: "ffebfc4d-79f6-428d-9635-002dcaad918c",
      }),
      url: "https://api.postmarkapp.com/servers/9363760",
      method: "GET",
      data: [],
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [],
      headers: [],
      responseType: "text",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });

    const data = JSON.parse(result.data);
    expect(data.ID).toBe(9363760);
    expect(typeof data.Name).toBe("string");
  });
});
