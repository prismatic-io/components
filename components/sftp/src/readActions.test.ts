import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import statFile from "./actions/files/statFile";
import { basic } from "./connections";

describe("statFile", () => {
  test("Verify SFTP can list files in a directory", async () => {
    const connection = createConnection(basic, {
      username: "demo",
      password: "demo",
      host: "demo.wftpserver.com",
      port: "2222",
    });
    const inputPath = "/download/Spring.jpg";
    const expectedResults = {
      mode: 33206, 
      uid: 0, 
      gid: 0, 
      size: 867573, 
      accessTime: 1585061591000, 
      modifyTime: 1585061591000, 
      isDirectory: false, 
      isFile: true, 
      isBlockDevice: false, 
      isCharacterDevice: false, 
      isSymbolicLink: false, 
      isFIFO: false, 
      isSocket: false, 
    };
    statFile.perform = jest.fn().mockResolvedValue({ data: expectedResults });
    const { result } = await invoke(statFile, {
      connection,
      inputPath,
    });
    expect(result.data).toStrictEqual(expectedResults);
  }, 20000);
});
