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
 * only the bootstrap version, as when a first publish stopped partway, gets its
 * trusted publisher. Any other package on npm is the workflow's to publish.
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
  if (published.versions.every((version) => version === BOOTSTRAP_VERSION)) {
    return { action: "trust", entry };
  }
  return {
    action: "skip",
    entry,
    reason: `npm already has ${published.latest ?? published.versions.join(", ")}; the publish workflow publishes its later versions`,
  };
};

const TrustConfigSchema = z.object({ id: z.string() }).passthrough();

/**
 * Reads the configurations `npm trust list --json` prints. npm prints one JSON
 * object per configuration, back to back, and nothing when there are none.
 */
export const trustConfigsIn = (output: string): z.infer<typeof TrustConfigSchema>[] => {
  const trimmed = output.trim();
  if (!trimmed) return [];
  const listed = JSON.parse(`[${trimmed.replace(/}\s*{/g, "},{")}]`);
  return parseAs(z.array(TrustConfigSchema), listed, "`npm trust list --json`");
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
  sleep?: (ms: number) => Promise<unknown>;
  now?: () => number;
  intervalMs?: number;
  limitMs?: number;
  /** Called before each wait with the packages npm does not show yet. */
  onWait?: (pending: string[]) => void;
}

/**
 * Waits until the registry shows each package at the bootstrap version. npm
 * holds a new package's first version back while it reviews it (about three
 * minutes for the first package), and the publish workflow skips a package
 * the registry does not show. Returns the packages still hidden when the time
 * runs out; a failed lookup counts as hidden.
 */
export const waitForPackages = async (
  names: readonly string[],
  {
    lookup = fetchPublished,
    sleep = (ms) => Bun.sleep(ms),
    now = Date.now,
    intervalMs = 15_000,
    limitMs = 15 * 60_000,
    onWait = () => {},
  }: WaitOptions = {},
): Promise<string[]> => {
  const deadline = now() + limitMs;
  let pending = [...names];
  for (;;) {
    const shown = await Promise.all(
      pending.map(async (name) =>
        ((await lookup(name).catch(() => null))?.versions ?? []).includes(BOOTSTRAP_VERSION),
      ),
    );
    pending = pending.filter((_, i) => !shown[i]);
    if (pending.length === 0 || now() >= deadline) return pending;
    onWait(pending);
    await sleep(intervalMs);
  }
};
