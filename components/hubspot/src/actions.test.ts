import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import * as dotenv from "dotenv";
import { getCurrentUser } from "./actions/getCurrentUser";
import { rawRequest } from "./actions/misc/rawRequest";
import { validateConnection } from "./actions/validateConnection";

import { privateAppAccessToken } from "./connections";

dotenv.config();

const connection = createConnection(privateAppAccessToken, {
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

describe("test raw request", () => {
  let testDealId: string;

  test("verify can create a deal with raw request", async () => {
    
    if (!connection.fields.accessToken) return;

    const { result: postResult } = await invoke(rawRequest, {
      connection,
      url: "/crm/v3/objects/deals",
      data: JSON.stringify({ Name: "My New Company" }),
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "POST",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
      fileDataFileNames: undefined,
    });

    expect(postResult.data.data).not.toBeNull();
    testDealId = postResult.data.data.id;
  });

  test("verify can retrieve a deal with raw request", async () => {
    
    if (!connection.fields.accessToken) return;

    
    if (!testDealId) return;

    const { result: getResult } = await invoke(rawRequest, {
      connection,
      url: `/crm/v3/objects/deals/${testDealId}`,
      data: undefined,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "GET",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
      fileDataFileNames: undefined,
    });

    expect(getResult.data.data.id).toStrictEqual(testDealId);
  });

  test("verify can update a deal with raw request", async () => {
    
    if (!connection.fields.accessToken) return;

    
    if (!testDealId) return;

    const updatedName = "Blah";
    const { result: patchResult } = await invoke(rawRequest, {
      connection,
      url: `/crm/v3/objects/deals/${testDealId}`,
      data: JSON.stringify({ properties: { dealname: updatedName } }),
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "PATCH",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
      fileDataFileNames: undefined,
    });

    expect(patchResult.data.data.properties.dealname).toStrictEqual(updatedName);
  });

  test("verify can delete a deal with raw request", async () => {
    
    if (!connection.fields.accessToken) return;

    
    if (!testDealId) return;

    const { result: deleteResult } = await invoke(rawRequest, {
      connection,
      url: `/crm/v3/objects/deals/${testDealId}`,
      data: undefined,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "DELETE",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
      fileDataFileNames: undefined,
    });

    expect(deleteResult.data.status).toStrictEqual(204);
  });
});

describe("test getCurrentUser", () => {
  test("verify getCurrentUser works", async () => {
    
    if (!connection.fields.accessToken) return;

    const { result } = await invoke(getCurrentUser, {
      timeout: undefined,
      hubspotConnection: connection,
    });

    expect(result.data.accountType).toStrictEqual("STANDARD");
  });
});

describe("test validateConnection", () => {
  test("verify validateConnection returns true for valid connection", async () => {
    
    if (!connection.fields.accessToken) return;

    const { result } = await invoke(validateConnection, {
      timeout: undefined,
      hubspotConnection: connection,
    });

    expect(result.data).toStrictEqual(true);
  });

  test("verify validateConnection returns false for invalid connection", async () => {
    const invalidConnection = createConnection(privateAppAccessToken, {
      accessToken: "foo",
    });

    const { result } = await invoke(validateConnection, {
      timeout: undefined,
      hubspotConnection: invalidConnection,
    });

    expect(result.data).toStrictEqual(false);
  });
});
