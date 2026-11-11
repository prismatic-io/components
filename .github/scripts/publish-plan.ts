import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import semver from "semver";
import { z } from "zod";

export const MANIFEST_FILE = "npm-api/manifest.json";
const SHARED_PACKAGE_PREFIX = "file:../../packages/";
export const REGISTRY = "https://registry.npmjs.org";

/**
 * `npm ci` without running any install script, the package's own `prepare`
 * included. Builds come only from `npm run build` and `npm publish`, and no
 * dependency's script runs where a package can publish. Every tsdown
 * component's build output was checked to be identical with and without
 * install scripts.
 */
export const NPM_CI_ARGS = ["ci", "--ignore-scripts", "--no-audit", "--no-fund"];

const ManifestEntrySchema = z.object({
  name: z.string().min(1),
  version: z.string(),
  build: z.string(),
  spectral: z.string().nullable(),
});
export const ManifestSchema = z.record(z.string(), ManifestEntrySchema);
export type ManifestEntry = z.infer<typeof ManifestEntrySchema>;
export type Manifest = z.infer<typeof ManifestSchema>;

/** The parts of a component's package.json this reads; everything else passes through. */
export const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    scripts: z.record(z.string(), z.string()).optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
  })
  .passthrough();
export type PackageJson = z.infer<typeof PackageJsonSchema>;

/** The abbreviated packument the registry returns for the install accept header. */
const PackumentSchema = z.object({
  versions: z.record(z.string(), z.unknown()).default({}),
  "dist-tags": z.record(z.string(), z.string()).default({}),
});

/** Parses `value` or throws an error naming `source` and every problem in it. */
export const parseAs = <T extends z.ZodTypeAny>(schema: T, value: unknown, source: string): z.infer<T> => {
  const result = schema.safeParse(value);
  if (result.success) return result.data;
  const problems = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
  throw new Error(`${source} is malformed: ${problems.join("; ")}`);
};

/** Shared packages a component pulls in with `file:../../packages/<name>`. */
export const sharedPackagesOf = (pkg: PackageJson): string[] =>
  Object.values({ ...pkg.dependencies, ...pkg.devDependencies })
    .filter((spec) => spec.startsWith(SHARED_PACKAGE_PREFIX))
    .map((spec) => spec.slice(SHARED_PACKAGE_PREFIX.length).replace(/\/$/, ""))
    .sort();

/** Whether a package.json has a build script. */
export const hasBuildScript = (pkg: PackageJson): boolean => pkg.scripts?.["build"] !== undefined;

/**
 * The shared packages a component pulls in that must be installed and built
 * before it builds. A shared package with no build script, such as
 * packages/build-config, is build tooling that the component's tsdown config
 * loads from source; the component's own `npm ci` links it, and nothing builds
 * it. `readShared` reads packages/<name>/package.json, or gives undefined when
 * there is none.
 */
export const sharedPackagesToBuild = (
  pkg: PackageJson,
  readShared: (name: string) => PackageJson | undefined,
): string[] =>
  sharedPackagesOf(pkg).filter((name) => {
    const shared = readShared(name);
    return shared !== undefined && hasBuildScript(shared);
  });

/** Reads packages/<name>/package.json, or gives undefined when there is none. */
export const readSharedPackage = (name: string): PackageJson | undefined => {
  const path = join("packages", name, "package.json");
  return existsSync(path)
    ? parseAs(PackageJsonSchema, JSON.parse(readFileSync(path, "utf8")), path)
    : undefined;
};

/** What the registry already has for a package; `null` when it has never been published. */
export interface Published {
  versions: string[];
  latest: string | null;
}

export type Plan =
  | { action: "publish"; key: string; entry: ManifestEntry }
  | { action: "skip"; key: string; entry: ManifestEntry; reason: string }
  | { action: "manual"; key: string; entry: ManifestEntry; reason: string }
  | { action: "error"; key: string; entry: ManifestEntry; reason: string };

/** What a plan reads from a component's package.json, which is what npm publishes. */
export type PackageIdentity = Pick<PackageJson, "name" | "version">;

/**
 * Why a manifest entry cannot publish, or null when it can. The registry is
 * asked about the manifest's name and npm publishes the package.json, so the
 * two must name the same package at the same version.
 */
const packageProblem = (entry: ManifestEntry, pkg: PackageIdentity | undefined): string | null => {
  if (!pkg) return "there is no package.json";
  if (pkg.name !== entry.name) {
    return `package.json names ${pkg.name ?? "no package"}, the manifest ${entry.name}`;
  }
  if (pkg.version !== entry.version) {
    return `package.json has ${pkg.version ?? "no version"}, the manifest ${entry.version}`;
  }
  if (!semver.valid(entry.version)) return `${entry.version} is not a valid version`;
  return null;
};

/**
 * Decides, per manifest entry, whether to publish. Refuses a version below
 * what npm already has as latest: that means npm-api/ was reset
 * or edited, and publishing would hand `^` ranges an older package.
 */
export const planPublish = (
  manifest: Manifest,
  packages: Record<string, PackageIdentity | undefined>,
  published: Record<string, Published | null>,
): Plan[] =>
  Object.entries(manifest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, entry]): Plan => {
      const invalid = packageProblem(entry, packages[key]);
      if (invalid) return { action: "error", key, entry, reason: invalid };
      const onNpm = published[key];
      if (onNpm === null) {
        return {
          action: "manual",
          key,
          entry,
          reason:
            "not on npm yet, or npm is still reviewing its first version; a developer creates it with `mise run publish-first`",
        };
      }
      if (onNpm?.versions.includes(entry.version)) {
        return { action: "skip", key, entry, reason: "already on npm" };
      }
      if (onNpm?.latest && semver.lt(entry.version, onNpm.latest)) {
        return {
          action: "error",
          key,
          entry,
          reason: `${entry.version} is below npm's latest ${onNpm.latest}; was npm-api/ reset?`,
        };
      }
      return { action: "publish", key, entry };
    });

/**
 * The version a developer publishes by hand to create a package on npm, below
 * every version the manifest records. npm needs the package before it can
 * trust the publish workflow, and a trusted publisher expires unless it
 * publishes within two days, so the manifest's version is left for the
 * workflow to publish right after.
 */
export const BOOTSTRAP_VERSION = "0.0.1";

export type FirstPublish =
  | { action: "bootstrap"; entry: ManifestEntry }
  | { action: "trust"; entry: ManifestEntry }
  | { action: "skip"; entry: ManifestEntry; reason: string }
  | { action: "error"; reason: string };

/**
 * Decides what a developer's first publish of `key` does. A package npm has
 * never seen gets the bootstrap version, then its trusted publisher. One with
 * nothing above the bootstrap version, as when a first publish stopped partway,
 * gets its trusted publisher. Any other package on npm is the workflow's to publish.
 */
export const planFirstPublish = (
  key: string,
  entry: ManifestEntry | undefined,
  pkg: PackageIdentity | undefined,
  published: Published | null,
): FirstPublish => {
  if (!entry) {
    return {
      action: "error",
      reason: `${key} is not in ${MANIFEST_FILE}, which lists every npm-ready component`,
    };
  }
  const invalid = packageProblem(entry, pkg);
  if (invalid) return { action: "error", reason: invalid };
  if (!semver.gt(entry.version, BOOTSTRAP_VERSION)) {
    return {
      action: "error",
      reason: `${entry.version} is not above ${BOOTSTRAP_VERSION}, so the workflow would have nothing to publish`,
    };
  }
  if (published === null) return { action: "bootstrap", entry };
  if (published.versions.includes(entry.version)) {
    return { action: "skip", entry, reason: `npm already has ${entry.version}` };
  }
  // npm also lists a placeholder it makes when it creates a package, such as
  // 0.0.0-stage; nothing at or below the bootstrap version is a real release.
  if (published.versions.every((version) => !semver.gt(version, BOOTSTRAP_VERSION))) {
    return { action: "trust", entry };
  }
  return {
    action: "skip",
    entry,
    reason: `npm already has ${published.latest ?? published.versions.join(", ")}; the publish workflow publishes its later versions`,
  };
};

const TrustConfigSchema = z.object({ id: z.string() }).passthrough();

/** Terminal escape sequences, which npm writes when its output is a terminal. */
const ESCAPES = /\u001b\[[0-?]*[ -/]*[@-~]|\u001b\][^\u0007]*(?:\u0007|\u001b\\)/g;

/**
 * The top-level JSON objects in `text`, in order, skipping any other text around
 * them, such as npm's prompt to authenticate. Braces inside strings do not count.
 */
export const jsonObjectsIn = (text: string): unknown[] => {
  const clean = text.replace(ESCAPES, "").replace(/\r/g, "");
  const objects: unknown[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (inString) {
      if (char === "\\") i++;
      else if (char === '"') inString = false;
    } else if (depth > 0 && char === '"') {
      inString = true;
    } else if (char === "{") {
      if (depth++ === 0) start = i;
    } else if (char === "}" && depth > 0 && --depth === 0) {
      objects.push(JSON.parse(clean.slice(start, i + 1)));
    }
  }
  if (depth > 0) throw new Error("the output ends inside a JSON object");
  return objects;
};

/**
 * Reads the configurations `npm trust list --json` prints: one JSON object per
 * configuration, back to back, nothing when there are none, and possibly npm's
 * prompt to authenticate before them when it ran in a terminal.
 */
export const trustConfigsIn = (output: string): z.infer<typeof TrustConfigSchema>[] =>
  parseAs(z.array(TrustConfigSchema), jsonObjectsIn(output), "`npm trust list --json`");

/** npm's error codes for a login or one-time password it needs and did not get. */
const AUTH_ERROR = /^npm (?:error|ERR!) code (?:EOTP|E401|ENEEDAUTH)\b/m;

/** Whether npm's error output says it needs the user to log in or authenticate again. */
export const needsNpmAuth = (stderr: string): boolean => AUTH_ERROR.test(stderr);

/** The audience npm accepts on a CI identity token it exchanges for a publish token. */
export const NPM_OIDC_AUDIENCE = `npm:${new URL(REGISTRY).hostname}`;

/**
 * Why npm does not recognize this workflow as `name`'s trusted publisher, or null when
 * it does. npm exchanges the workflow's identity token for a token only when the
 * package has a trusted publisher naming this repository and workflow, so asking for
 * one finds a missing or mismatched trusted publisher without building or publishing
 * anything; the token is discarded. It does not prove `npm publish` will be allowed:
 * npm grants publishing and staged publishing separately, and a trusted publisher
 * allowed only to stage still exchanges. publish-first always allows publishing.
 * A registry failure is an error rather than a reason, like {@link fetchPublished}.
 */
export const trustProblem = async (
  name: string,
  idToken: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string | null> => {
  const res = await fetchImpl(
    `${REGISTRY}/-/npm/v1/oidc/token/exchange/package/${name.replace("/", "%2F")}`,
    { method: "POST", headers: { accept: "application/json", authorization: `Bearer ${idToken}` } },
  );
  if (res.status >= 500) throw new Error(`${name}: registry answered ${res.status} to the token exchange`);
  const body: unknown = await res.json().catch(() => null);
  const field = (key: string): string | undefined => {
    const value = body !== null && typeof body === "object" ? (body as Record<string, unknown>)[key] : undefined;
    return typeof value === "string" && value ? value : undefined;
  };
  if (res.ok) return field("token") ? null : "npm accepted the exchange but sent no token";
  const message = field("message") ?? field("error");
  return `npm answered ${res.status}${message ? `: ${message}` : ""}`;
};

/** Looks a package up on the registry; `fetchImpl` is a seam for tests. */
export const fetchPublished = async (
  name: string,
  fetchImpl: typeof fetch = fetch,
): Promise<Published | null> => {
  const res = await fetchImpl(`${REGISTRY}/${name.replace("/", "%2F")}`, {
    headers: { accept: "application/vnd.npm.install-v1+json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${name}: registry answered ${res.status}`);
  const body = parseAs(PackumentSchema, await res.json(), `the registry's answer for ${name}`);
  return { versions: Object.keys(body.versions), latest: body["dist-tags"]["latest"] ?? null };
};

export interface WaitOptions {
  lookup?: (name: string) => Promise<Published | null>;
  intervalMs?: number;
  limitMs?: number;
  /** Called before each wait with the packages npm does not show yet. */
  onWait?: (pending: string[]) => void;
}

/**
 * Waits until the registry shows each package at the bootstrap version. npm
 * holds a new package's first version back while it reviews it (about three
 * minutes for the first package), and the publish workflow skips a package
 * the registry does not show. It looks once, then again after each interval,
 * for at most `limitMs` (61 lookups by default), and returns the packages
 * still hidden; a failed lookup counts as hidden.
 */
export const waitForPackages = async (
  names: readonly string[],
  { lookup = fetchPublished, intervalMs = 15_000, limitMs = 15 * 60_000, onWait = () => {} }: WaitOptions = {},
): Promise<string[]> => {
  const waits = Math.floor(limitMs / intervalMs);
  let pending = [...names];
  for (let waited = 0; waited <= waits; waited++) {
    if (waited > 0) {
      onWait(pending);
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    const shown = await Promise.all(
      pending.map(async (name) =>
        ((await lookup(name).catch(() => null))?.versions ?? []).includes(BOOTSTRAP_VERSION),
      ),
    );
    pending = pending.filter((_, i) => !shown[i]);
    if (pending.length === 0) break;
  }
  return pending;
};
