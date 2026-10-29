import { createAuthorizedClient } from "./client";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { storageSharedKey, connectionString } from "./connections";

describe("createAuthorizedClient", () => {
  test("returns client with connectionString", () => {
    if (!process.env.AZURE_CONNECTION_STRING) return;
    const connection = createConnection(connectionString, {
      connectionString: process.env.AZURE_CONNECTION_STRING,
    });

    expect(createAuthorizedClient(connection)).not.toBeUndefined();
  });

  test("returns client with storageSharedKey", () => {
    if (!process.env.AZURE_USERNAME || !process.env.AZURE_PASSWORD) return;
    const connection = createConnection(storageSharedKey, {
      username: process.env.AZURE_USERNAME,
      password: process.env.AZURE_PASSWORD,
    });

    expect(createAuthorizedClient(connection)).not.toBeUndefined();
  });
});
