import https from "node:https";
import type { AddressInfo } from "node:net";
import { generate } from "selfsigned";
import { createGitlabClient } from "./client";
import { onPremConnectionValue } from "./testHelpers";

let cert: string;
let server: https.Server;
let port: number;
const seenHosts: string[] = [];

beforeAll(async () => {
  const pems = await generate([{ name: "commonName", value: "gitlab.test" }], {
    keyType: "ec",
    algorithm: "sha256",
    extensions: [
      { name: "basicConstraints", cA: false },
      { name: "subjectAltName", altNames: [{ type: 2, value: "gitlab.test" }] },
    ],
  });
  cert = pems.cert;
  server = https.createServer({ cert, key: pems.private }, (req, res) => {
    seenHosts.push(String(req.headers.host));
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ id: 1, username: "root" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  port = (server.address() as AddressInfo).port;
});

afterAll(() => {
  server.close();
});

const tunnel = (fields: Record<string, unknown>) =>
  createGitlabClient(
    onPremConnectionValue({ host: "127.0.0.1", port: String(port), ...fields }),
    false,
  );

describe("on-prem TLS through a tunnel", () => {
  test("validates against the GitLab URL hostname when the CA is supplied", async () => {
    const { data } = await tunnel({ caCertificate: cert }).get("/user");
    expect(data).toEqual({ id: 1, username: "root" });
    expect(seenHosts.at(-1)).toBe("gitlab.test");
  });

  test("fails cleanly without the CA", async () => {
    await expect(tunnel({}).get("/user")).rejects.toThrow(/CA Certificate/);
  });

  test("fails when the certificate does not match the GitLab URL hostname", async () => {
    await expect(
      tunnel({ gitlabUrl: "https://other.test", caCertificate: cert }).get(
        "/user",
      ),
    ).rejects.toThrow(/does not match/);
  });

  test("Ignore SSL Errors skips validation", async () => {
    const { data } = await tunnel({ ignoreSslErrors: true }).get("/user");
    expect(data.username).toBe("root");
  });

  test("an IP-address GitLab URL still validates by identity check", async () => {
    await expect(
      tunnel({ gitlabUrl: "https://10.9.9.9", caCertificate: cert }).get(
        "/user",
      ),
    ).rejects.toThrow(/does not match/);
  });
});
