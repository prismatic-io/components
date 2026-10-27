import semver from "semver";
import { z } from "zod";

export const MANIFEST_FILE = "npm-api/manifest.json";
const SHARED_PACKAGE_PREFIX = "file:../../packages/";
const REGISTRY = "https://registry.npmjs.org";

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

/**
 * Decides, per manifest entry, whether to publish. Refuses a version below
 * what npm already has as latest: that means npm-api/ was reset
 * or edited, and publishing would hand `^` ranges an older package.
 */
export const planPublish = (
  manifest: Manifest,
  packageVersions: Record<string, string | undefined>,
  published: Record<string, Published | null>,
): Plan[] =>
  Object.entries(manifest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, entry]): Plan => {
      const inPackage = packageVersions[key];
      if (inPackage !== entry.version) {
        return {
          action: "error",
          key,
          entry,
          reason: `package.json has ${inPackage ?? "no version"}, the manifest ${entry.version}`,
        };
      }
      if (!semver.valid(entry.version)) {
        return { action: "error", key, entry, reason: `${entry.version} is not a valid version` };
      }
      const onNpm = published[key];
      if (onNpm === null) {
        return {
          action: "manual",
          key,
          entry,
          reason: "not on npm yet; a developer publishes the first version by hand",
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
