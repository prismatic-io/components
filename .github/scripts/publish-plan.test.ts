import { describe, expect, test } from "bun:test";
import {
  BOOTSTRAP_VERSION,
  fetchPublished,
  type Manifest,
  type ManifestEntry,
  ManifestSchema,
  PackageJsonSchema,
  type Published,
  parseAs,
  planFirstPublish,
  planPublish,
  sharedPackagesOf,
  trustConfigsIn,
  waitForPackages,
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

/** slack's package.json, at `version`. */
const pkg = (version: string, name = "@prismatic-io/components-slack") => ({ name, version });

/** Plans one package, `slack`, whose package.json carries `inPackage`. */
const planOne = (version: string, published: Published | null, inPackage = version) =>
  planPublish({ slack: entry(version) }, { slack: pkg(inPackage) }, { slack: published })[0];

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
    expect(plan).toMatchObject({ action: "error", reason: "there is no package.json" });
  });

  test("refuses a manifest name that disagrees with package.json", () => {
    const [plan] = planPublish(
      { slack: entry("0.2.0") },
      { slack: pkg("0.2.0", "@prismatic-io/components-zoom") },
      { slack: onNpm(["0.1.0"]) },
    );
    expect(plan).toMatchObject({
      action: "error",
      reason: "package.json names @prismatic-io/components-zoom, the manifest @prismatic-io/components-slack",
    });
  });

  test("refuses an invalid version before asking anything of npm", () => {
    const plan = planOne("banana", null);
    expect(plan).toMatchObject({ action: "error", reason: "banana is not a valid version" });
  });

  test("plans every entry, in key order", () => {
    const manifest: Manifest = { zoom: entry("0.1.0"), asana: entry("0.1.0"), slack: entry("0.1.0") };
    const packages = { zoom: pkg("0.1.0"), asana: pkg("0.1.0"), slack: pkg("0.1.0") };
    const published = { zoom: null, asana: onNpm(["0.1.0"]), slack: onNpm(["0.0.9"]) };
    expect(planPublish(manifest, packages, published).map((p) => [p.key, p.action])).toEqual([
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

describe("planFirstPublish", () => {
  test("bootstraps a package npm has never seen", () => {
    expect(planFirstPublish("slack", entry("0.1.0"), pkg("0.1.0"), null)).toEqual({
      action: "bootstrap",
      entry: entry("0.1.0"),
    });
  });

  test("only sets the trusted publisher when npm has just the bootstrap version", () => {
    expect(planFirstPublish("slack", entry("0.1.0"), pkg("0.1.0"), onNpm([BOOTSTRAP_VERSION]))).toEqual({
      action: "trust",
      entry: entry("0.1.0"),
    });
  });

  test("leaves a package npm already has the manifest version of", () => {
    expect(
      planFirstPublish("slack", entry("0.1.0"), pkg("0.1.0"), onNpm([BOOTSTRAP_VERSION, "0.1.0"])),
    ).toEqual({ action: "skip", entry: entry("0.1.0"), reason: "npm already has 0.1.0" });
  });

  test("leaves a package with other versions on npm to the workflow", () => {
    const step = planFirstPublish("slack", entry("0.3.0"), pkg("0.3.0"), onNpm(["0.1.0", "0.2.0"]));
    expect(step).toMatchObject({ action: "skip", reason: expect.stringContaining("npm already has 0.2.0") });
  });

  test("refuses a manifest version the workflow could not publish after the bootstrap", () => {
    expect(planFirstPublish("slack", entry(BOOTSTRAP_VERSION), pkg(BOOTSTRAP_VERSION), null)).toEqual({
      action: "error",
      reason: "0.0.1 is not above 0.0.1, so the workflow would have nothing to publish",
    });
  });

  test("refuses a component the manifest does not list", () => {
    const step = planFirstPublish("slack", undefined, pkg("0.0.1"), null);
    expect(step).toEqual({ action: "error", reason: expect.stringContaining("slack is not in npm-api/manifest.json") });
  });

  test("refuses a manifest version that disagrees with package.json", () => {
    expect(planFirstPublish("slack", entry("0.1.0"), pkg("0.0.1"), null)).toEqual({
      action: "error",
      reason: "package.json has 0.0.1, the manifest 0.1.0",
    });
  });

  test("refuses an invalid version", () => {
    expect(planFirstPublish("slack", entry("one"), pkg("one"), null)).toEqual({
      action: "error",
      reason: "one is not a valid version",
    });
  });
});


describe("trustConfigsIn", () => {
  test("reads nothing from empty output", () => {
    expect(trustConfigsIn("")).toEqual([]);
    expect(trustConfigsIn("\n")).toEqual([]);
  });

  test("reads one configuration", () => {
    const output = `{
  "id": "a1",
  "type": "github",
  "file": "npm-publish.yml",
  "repository": "prismatic-io/components",
  "permissions": [
    "createPackage"
  ]
}
`;
    expect(trustConfigsIn(output)).toEqual([
      {
        id: "a1",
        type: "github",
        file: "npm-publish.yml",
        repository: "prismatic-io/components",
        permissions: ["createPackage"],
      },
    ]);
  });

  test("reads configurations printed back to back", () => {
    const output = '\n{\n  "id": "a1",\n  "type": "github"\n}\n\n{\n  "id": "b2",\n  "type": "circleci"\n}\n';
    expect(trustConfigsIn(output).map((config) => config.id)).toEqual(["a1", "b2"]);
  });

  test("rejects a configuration without an id", () => {
    expect(() => trustConfigsIn('{ "type": "github" }')).toThrow("npm trust list --json");
  });
});

describe("waitForPackages", () => {
  /** A registry that starts showing each package after the given number of lookups. */
  const registry = (shownAfter: Record<string, number>) => {
    const lookups: Record<string, number> = {};
    return async (name: string) => {
      lookups[name] = (lookups[name] ?? 0) + 1;
      return lookups[name] > (shownAfter[name] ?? Number.POSITIVE_INFINITY)
        ? onNpm([BOOTSTRAP_VERSION])
        : null;
    };
  };
  /** A clock that moves only when the wait sleeps. */
  const clock = () => {
    let time = 0;
    const sleeps: number[] = [];
    return {
      now: () => time,
      sleep: async (ms: number) => {
        sleeps.push(ms);
        time += ms;
      },
      sleeps,
    };
  };

  test("returns at once when npm shows every package", async () => {
    const c = clock();
    const lookup = registry({ a: 0, b: 0 });
    expect(await waitForPackages(["a", "b"], { lookup, ...c })).toEqual([]);
    expect(c.sleeps).toEqual([]);
  });

  test("waits until npm shows each package, asking only about the hidden ones", async () => {
    const c = clock();
    const waits: string[][] = [];
    const lookup = registry({ a: 1, b: 3 });
    const pending = await waitForPackages(["a", "b"], {
      lookup,
      ...c,
      intervalMs: 10,
      onWait: (names) => waits.push(names),
    });
    expect(pending).toEqual([]);
    expect(waits).toEqual([["a", "b"], ["b"], ["b"]]);
    expect(c.sleeps).toEqual([10, 10, 10]);
  });

  test("returns what is still hidden when time runs out", async () => {
    const c = clock();
    const lookup = registry({ a: 0 });
    expect(await waitForPackages(["a", "b"], { lookup, ...c, intervalMs: 10, limitMs: 25 })).toEqual(["b"]);
    expect(c.sleeps).toEqual([10, 10, 10]);
  });

  test("treats a package without the bootstrap version, or a failed lookup, as hidden", async () => {
    const c = clock();
    const lookup = async (name: string) => {
      if (name === "a") throw new Error("registry answered 503");
      return onNpm(["0.0.0-stage"]);
    };
    expect(await waitForPackages(["a", "b"], { lookup, ...c, intervalMs: 10, limitMs: 10 })).toEqual(["a", "b"]);
  });
});
