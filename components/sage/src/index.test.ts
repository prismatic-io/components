import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { listContacts } from "./actions/contacts";
import { oauth } from "./connections";

const connection = createConnection(oauth, {});

connection.token = { access_token: process.env.SAGE_ACCOUNTING_TOKEN };

describe("test listContacts", () => {
  test("verify the return value of listContacts", async () => {
    const { result } = await invoke(listContacts, {
      connection,
      page: undefined,
      itemsPerPage: undefined,
      updated_or_created_since: undefined,
    });
    expect(result.data).toBeDefined();
  });
});
