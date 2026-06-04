import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import listDirectory from "./actions/files/listDirectory";
import { basic } from "./connections";

const connection = createConnection(basic, {
  username: "demo",
  password: "demo",
  host: "demo.wftpserver.com",
  port: "21",
  secure: "true",
  ignoreSslErrors: "true", 
});

describe("listdirectory", () => {
  test("test listdirectory action", async () => {
    const { result } = await invoke(listDirectory, {
      connection,
      verbose: false,
      path: "/",
    });
    expect(result.data.length).toStrictEqual(2);
  });
});
