





import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import listDirectory from "./actions/directories/listDirectory";
import { basic } from "./connections";

const basicAuthConnection = createConnection(basic, {
  username: "myuser",
  password: "mypass",
  host: "localhost",
  port: "2223",
  timeout: "3000",
});

describe("Connect to server that only allows keyboard-interactive", () => {
  if (!process.env.DOCKER_ENABLED) {
    console.warn(
      "Skipping SSH key tests. Run `DOCKER_ENABLED=true npm run test` to enable.",
    );
    test("Skip", async () => {
      return Promise.resolve();
    });
    return;
  }
  test("Connect to a system using keyboard-interactive (but not password) auth", async () => {
    const { result, loggerMock } = await invoke(listDirectory, {
      connection: basicAuthConnection,
      path: "/",
      pattern: "",
      includeSubdirectories: false,
      includeDirectories: false,
    });
    expect(result?.data).toEqual([".dockerenv", "bin", "lib", "sbin"]);
    expect(loggerMock.debug).toHaveBeenCalledWith(
      "Client: password auth failed",
    );
    expect(loggerMock.debug).toHaveBeenCalledWith(
      "This SFTP server requires keyboard-interactive login. Falling back to keyboard-interactive.",
    );
  });
});
