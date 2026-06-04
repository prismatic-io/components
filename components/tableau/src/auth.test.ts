import { getTableuClient } from "./auth";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { signIn } from "./signIn";
import { tableauConnection } from "./connections";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

const connection = createConnection(tableauConnection, {
  token: process.env.TABLEAU_TOKEN,
  tokenName: "firstToken",
  hostName: "prod-useast-b.online.tableau.com",
  siteId: "testprismatic",
});

describe("Sign in", () => {
  test("verify the axios request works as expected", async () => {
    const client = createClient({
      baseUrl: "https://prod-useast-b.online.tableau.com/api/3.2/auth/signin",
    });
    if (connection.key === "privateKey") {
      const signInResult = await client.post(
        "",
        {
          credentials: {
            personalAccessTokenName: connection.fields.tokenName,
            personalAccessTokenSecret: connection.fields.token,
            site: {
              contentUrl: "testprismatic",
            },
          },
        },
        {
          headers: {
            Accepts: "application/json",
            "Content-type": "application/json",
          },
        },
      );

      expect(signInResult).toBeDefined();
    }
  });

  test("Verify the sign in function works as expected", async () => {
    const client = await signIn({
      tableauConnection: connection,
    });

    expect(client).toBeDefined();
  });

  test("Verify the Create Client calls the sign in function as expected", async () => {
    const client = await getTableuClient({
      tableauConnection: connection,
      timeout: 5000,
      debug: true,
    });

    expect(client).toBeDefined();
  });
});
