import * as dotenv from "dotenv";
import { util } from "@prismatic-io/spectral";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import query from "./records/query";
import { rawRequest } from "./misc/rawRequest";
import { createLead } from "./leads/createLead";
import { getCurrentUser } from "./misc/getCurrentUser";
import { validateConnection } from "./misc/validateConnection";
import { coerceObjectValues } from "../util";
import { salesforceBasic, salesforceOAuth } from "../connections/";

dotenv.config();

const version = "51.0";

let connection = null;
if (process.env.PRISMATIC_CONNECTION_VALUE) {
  connection = {
    key: salesforceOAuth.key,
    ...JSON.parse(process.env.PRISMATIC_CONNECTION_VALUE),
  };
} else if (process.env.SF_USERNAME) {
  connection = createConnection(salesforceBasic, {
    username: process.env.SF_USERNAME,
    password: util.types.toString(process.env.SF_PASSWORD),
    loginUrl: process.env.SF_LOGIN_URL,
  });
}

const randString = (): string => `${Math.random() * 1000000000}`;

describe("test raw request", () => {
  let testAccountId: string;

  test("verify can create an account with raw request ", async () => {
    
    if (!connection) return;

    const { result: postResult } = await invoke(rawRequest, {
      connection,
      version: version,
      url: "sobjects/Account/",
      data: { Name: `${randString()} Company` },
      debugRequest: false,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "POST",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
      fileDataFileNames: { "": "" },
      retryAllErrors: undefined,
    });

    expect(postResult.data.data).not.toBeNull();
    testAccountId = postResult.data.data.id;
  });

  test("verify can get an account with raw request ", async () => {
    
    if (!connection) return;

    
    if (!testAccountId) return;

    const { result: getResult } = await invoke(rawRequest, {
      connection,
      version,
      url: `sobjects/Account/${testAccountId}`,
      data: undefined,
      debugRequest: false,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "GET",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      fileDataFileNames: { "": "" },
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
    });

    expect(getResult.data.data.Id).toStrictEqual(testAccountId);
  });

  test("verify can update an account with raw request ", async () => {
    
    if (!connection) return;

    
    if (!testAccountId) return;

    const { result: patchResult } = await invoke(rawRequest, {
      connection,
      version,
      url: `sobjects/Account/${testAccountId}`,
      data: { Name: randString() },
      debugRequest: false,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "PATCH",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      fileDataFileNames: { "": "" },
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
    });

    expect(patchResult.data.status).toStrictEqual(204);
  });

  test("verify can delete an account with raw request ", async () => {
    
    if (!connection) return;

    
    if (!testAccountId) return;

    const { result: deleteResult } = await invoke(rawRequest, {
      connection,
      version,
      url: `sobjects/Account/${testAccountId}`,
      data: undefined,
      debugRequest: false,
      fileData: undefined,
      formData: undefined,
      headers: undefined,
      maxRetries: undefined,
      method: "DELETE",
      queryParams: undefined,
      responseType: "json",
      retryDelayMS: undefined,
      fileDataFileNames: { "": "" },
      retryAllErrors: undefined,
      timeout: undefined,
      useExponentialBackoff: undefined,
    });
    expect(deleteResult.data.status).toStrictEqual(204);
  });
});

describe("test query action", () => {
  test("verify the query action works as expected", async () => {
    
    if (!connection) return;

    const queryString = "SELECT Id, Name FROM Opportunity";
    const { result } = await invoke(query, {
      connection,
      version,
      queryString,
    });
    expect(result.data).toHaveProperty("records");
  });
});

describe("test coerceObjectValues", () => {
  test("verify coerceObjectValues correctly coerces a boolean", () => {
    const fieldValues = {
      DoNotCall: "false",
      IsDeleted: "false",
    };
    const fieldValueTypes = {
      DoNotCall: "Boolean",
      IsDeleted: "Boolean",
    };
    const result = coerceObjectValues(fieldValues, fieldValueTypes);

    expect(result.IsDeleted).toStrictEqual(false);
  });

  test("verify coerceObjectValues correctly coerces a number", () => {
    const fieldValues = {
      AnnualRevenue: "0",
      NumberOfEmployees: "0",
    };
    const fieldValueTypes = {
      AnnualRevenue: "Number",
      NumberOfEmployees: "Number",
    };
    const result = coerceObjectValues(fieldValues, fieldValueTypes);

    expect(result.NumberOfEmployees).toStrictEqual(0);
  });

  test("verify coerceObjectValues correctly coerces a string", () => {
    const fieldValues = {
      firstName: "John",
      lastName: "Smith",
    };
    const fieldValueTypes = {
      firstName: "String",
      lastName: "String",
    };
    const result = coerceObjectValues(fieldValues, fieldValueTypes);

    expect(result.firstName).toStrictEqual("John");
  });
});

describe("test createLead action", () => {
  test("verify the createLead action works as expected", async () => {
    
    if (!connection) return;

    const company = `${Math.random() * 1000000000} Company`;
    const firstName = randString();
    const lastName = randString();
    const title = "Manager";
    const phone = "15554444321";
    const email = `${randString()}@${randString()}.com`;
    const leadSource = "Web";
    const rating = randString();
    const website = `${randString()}.com`;
    const street = randString();
    const fieldValues = { Fax: "15554444321" };
    const dynamicValues = { Fax: "15554444321" };
    const state = "CA";
    const city = randString();
    const postalCode = "94024";
    const employeeCount = "200";
    const description = randString();
    const revenue = "3000";
    const leadStatus = "Converted";

    const { result } = await invoke(createLead, {
      version,
      dynamicValues,
      fieldValues,
      firstName,
      lastName,
      company,
      title,
      phone,
      email,
      leadSource,
      rating,
      website,
      street,
      state,
      city,
      postalCode,
      employeeCount,
      description,
      revenue,
      leadStatus,
      connection,
    });
    expect(result.data).toHaveProperty("success", true);
  });
});

describe("test getCurrentUser", () => {
  test("verify getCurrentUser works", async () => {
    
    if (!connection) return;

    const { result } = await invoke(getCurrentUser, {
      version,
      connection,
    });

    expect(result.data).not.toBeNull();
  });
});

describe("test validateConnection", () => {
  test("verify validateConnection returns true for valid connection", async () => {
    
    if (!connection) return;

    const { result } = await invoke(validateConnection, {
      version,
      connection,
    });

    expect(result.data).toStrictEqual(true);
  });

  test("verify validateConnection returns false for invalid connection", async () => {
    const invalidConnection = createConnection(salesforceBasic, {
      username: "foo",
      password: "bar",
      loginUrl: "https://blah.prismatic.io",
    });

    const { result } = await invoke(validateConnection, {
      version,
      connection: invalidConnection,
    });

    expect(result.data).toStrictEqual(false);
  });
});
