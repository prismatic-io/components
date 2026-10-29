import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createAuthorizedClient } from "./client";
import { connectionString, StorageSharedKey } from "./connections";

describe("createAuthorizedClient", () => {
  test("returns client with connectionString", () => {
    const connection = createConnection(connectionString, {
      connectionString:
        "DefaultEndpointsProtocol=https;AccountName=testaccount;AccountKey=dGVzdGtleQ==;EndpointSuffix=core.windows.net",
    });

    expect(createAuthorizedClient(connection)).not.toBeUndefined();
  });

  test("returns client with storageSharedKey", () => {
    const connection = createConnection(StorageSharedKey, {
      accountName: "testaccount",
      accountKey: "dGVzdGtleQ==",
    });

    expect(createAuthorizedClient(connection)).not.toBeUndefined();
  });
});
