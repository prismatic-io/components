import { createClient } from "./client";

describe("createAuthorizedClient", () => {
  test("returns Oauth Client", async () => {
    const drive = createClient({
      key: "",
      configVarKey: "",
      fields: {},
      token: { access_token: process.env.GOOGLE_DRIVE_TEST_TOKEN },
    });
    const data = await drive.about.get({ fields: "*" });
    console.log(data);
  });
});
