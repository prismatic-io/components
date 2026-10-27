import { describe, expect, test } from "bun:test";
import {
  fetchPublished,
  type Manifest,
  type ManifestEntry,
  ManifestSchema,
  PackageJsonSchema,
  type Published,
  parseAs,
  planPublish,
  sharedPackagesOf,
} from "./publish-plan.ts";

const entry = (version: string): ManifestEntry => ({
  name: "@prismatic-io/components-slack",
  version,
  build: "b1",
  spectral: "^10.36.0",
});

const onNpm = (versions: string[], latest = versions.at(-1) ?? null): Published => ({
  versions,
  latest,
});

/** Plans one package, `slack`, whose package.json carries `inPackage`. */
const planOne = (version: string, published: Published | null, inPackage = version) =>
  planPublish({ slack: entry(version) }, { slack: inPackage }, { slack: published })[0];

describe("planPublish", () => {
  test("publishes a version newer than anything on npm", () => {
    expect(planOne("0.2.0", onNpm(["0.1.0", "0.1.1"]))?.action).toBe("publish");
  });

  test("skips a version npm already has, so reruns publish nothing", () => {
    const plan = planOne("0.1.1", onNpm(["0.1.0", "0.1.1"]));
    expect(plan).toMatchObject({ action: "skip", reason: "already on npm" });
  });

  test("leaves a package npm has never seen to a developer", () => {
    const plan = planOne("0.1.0", null);
    expect(plan?.action).toBe("manual");
  });

  test("refuses a version below npm's latest, as after a reset of npm-api/", () => {
    const plan = planOne("0.1.0", onNpm(["0.3.0"]));
    expect(plan).toMatchObject({ action: "error" });
    expect(plan?.action === "error" && plan.reason).toContain("below npm's latest 0.3.0");
  });

  test("refuses a patch on an older line too: backports are not published here", () => {
    expect(planOne("0.1.2", onNpm(["0.1.0", "0.1.1", "0.2.0"]))?.action).toBe("error");
  });

  test("refuses a manifest version that disagrees with package.json", () => {
    const plan = planOne("0.2.0", onNpm(["0.1.0"]), "0.0.1");
    expect(plan).toMatchObject({
      action: "error",
      reason: "package.json has 0.0.1, the manifest 0.2.0",
    });
  });

  test("refuses a manifest entry whose package.json is missing", () => {
    const [plan] = planPublish({ slack: entry("0.2.0") }, {}, { slack: onNpm(["0.1.0"]) });
    expect(plan).toMatchObject({ action: "error", reason: "package.json has no version, the manifest 0.2.0" });
  });

  test("refuses an invalid version before asking anything of npm", () => {
    const plan = planOne("banana", null);
    expect(plan).toMatchObject({ action: "error", reason: "banana is not a valid version" });
  });

  test("plans every entry, in key order", () => {
    const manifest: Manifest = { zoom: entry("0.1.0"), asana: entry("0.1.0"), slack: entry("0.1.0") };
    const versions = { zoom: "0.1.0", asana: "0.1.0", slack: "0.1.0" };
    const published = { zoom: null, asana: onNpm(["0.1.0"]), slack: onNpm(["0.0.9"]) };
    expect(planPublish(manifest, versions, published).map((p) => [p.key, p.action])).toEqual([
      ["asana", "skip"],
      ["slack", "publish"],
      ["zoom", "manual"],
    ]);
  });

  test("an empty manifest plans nothing", () => {
    expect(planPublish({}, {}, {})).toEqual([]);
  });
});

describe("sharedPackagesOf", () => {
  test("reads file: references to packages/ from either dependency section", () => {
    const pkg = {
      dependencies: { axios: "^1.0.0", "@prismatic-io/aws-utils": "file:../../packages/aws-utils/" },
      devDependencies: { "@prismatic-io/ms-utils": "file:../../packages/ms-utils" },
    };
    expect(sharedPackagesOf(pkg)).toEqual(["aws-utils", "ms-utils"]);
  });

  test("a package with no shared packages needs none built", () => {
    expect(sharedPackagesOf({ dependencies: { axios: "^1.0.0" } })).toEqual([]);
    expect(sharedPackagesOf({})).toEqual([]);
  });
});

describe("fetchPublished", () => {
  const respond =
    (status: number, body: unknown = {}) =>
    async (url: string | URL | Request) => {
      calls.push(String(url));
      return new Response(JSON.stringify(body), { status });
    };
  let calls: string[] = [];
  const fake = (status: number, body?: unknown) => {
    calls = [];
    return respond(status, body) as unknown as typeof fetch;
  };

  test("reads the versions and the latest tag", async () => {
    const body = { versions: { "0.1.0": {}, "0.2.0": {} }, "dist-tags": { latest: "0.2.0" } };
    expect(await fetchPublished("@prismatic-io/components-slack", fake(200, body))).toEqual({
      versions: ["0.1.0", "0.2.0"],
      latest: "0.2.0",
    });
    expect(calls).toEqual(["https://registry.npmjs.org/@prismatic-io%2Fcomponents-slack"]);
  });

  test("a 404 means npm has never seen the package", async () => {
    expect(await fetchPublished("@prismatic-io/components-new", fake(404))).toBeNull();
  });

  test("an answer that is not a packument is an error", async () => {
    await expect(
      fetchPublished("@prismatic-io/components-slack", fake(200, { versions: ["0.1.0"] })),
    ).rejects.toThrow("the registry's answer for @prismatic-io/components-slack is malformed");
  });

  test("any other failure is an error, never 'not published'", async () => {
    await expect(fetchPublished("@prismatic-io/components-slack", fake(503))).rejects.toThrow(
      "registry answered 503",
    );
  });
});

describe("parseAs", () => {
  test("accepts a well-formed manifest", () => {
    const manifest = { slack: entry("0.1.0") };
    expect(parseAs(ManifestSchema, manifest, "npm-api/manifest.json")).toEqual(manifest);
  });

  test("names the file and every problem in a malformed manifest", () => {
    const manifest = { slack: { name: "", version: 1, build: "b1" } };
    expect(() => parseAs(ManifestSchema, manifest, "npm-api/manifest.json")).toThrow(
      /^npm-api\/manifest\.json is malformed: slack\.name: .+; slack\.version: .+; slack\.spectral: .+$/,
    );
  });

  test("keeps package.json fields it does not read", () => {
    const pkg = { name: "x", version: "0.1.0", publishConfig: { access: "public" } };
    expect(parseAs(PackageJsonSchema, pkg, "package.json")).toEqual(pkg);
  });

  test("rejects a package.json whose dependencies are not name -> range", () => {
    expect(() =>
      parseAs(PackageJsonSchema, { dependencies: ["axios"] }, "components/slack/package.json"),
    ).toThrow("components/slack/package.json is malformed: dependencies:");
  });
});
