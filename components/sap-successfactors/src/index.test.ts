import fs from "node:fs";
import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listRecords } from "./actions/records/list";
import { createClient } from "./client";
import { apiKeyAuthentication } from "./connections";

jest.setTimeout(30000);



const cert = fs.readFileSync("public.pem").toString("utf-8");



const key = fs.readFileSync("private.pem").toString("utf-8");


const apiKey = "ZGI4Y2UzYmZhMDk3OWE5NTdmYjI2YzdiNmFlNw";


const server = "https://api68sales.successfactors.com";


const companyId = "SFCPART002090";


const user = "sfadmin";


const issuer = "www.successfactors.com";
const _ttl = 3600;

describe("createAuthorizedClient", () => {
  const connection: Connection = {
    configVarKey: "api-connection",
    key: apiKeyAuthentication.key,
    fields: {
      user,
      apiKey,
      audiences: "www.successfactors.com",
      issuer,
      companyId: companyId,
      protocol: "odata",
      privateKey: key,
      cert,
      apiServer: server,
    },
  };

  test("make a request via a client", async () => {
    const client = await createClient(connection);
    const result = await client.get("/User");
    console.log(result.data?.d?.results);
  });
  test("List User Records", async () => {
    const result = await invoke(listRecords, {
      recordType: "User",
      connection,
      customQueryParams: undefined,
      fetchAll: false,
      $top: undefined,
      $skip: undefined,
      $search: undefined,
      $select: undefined,
      $filter: undefined,
      $count: false,
      $orderby: undefined,
      $expand: undefined,
    });
    console.log(result.result.data);
  });
});
