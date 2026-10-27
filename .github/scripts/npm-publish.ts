/**
 * Publishes the npm packages of npm-ready components.
 *
 * Versions are recorded in npm-api/manifest.json. This publishes what the
 * manifest lists and npm does not have yet, so reruns and commits that bump
 * nothing are no-ops.
 *
 * A package npm has never seen is not published here. Its first version is
 * published by hand by a developer, which creates the package on npm so its
 * trusted publisher can point at this workflow; every later version is ours.
 *
 * Usage: bun .github/scripts/npm-publish.ts [--dry-run]
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import { $ } from "bun";
import {
  fetchPublished,
  MANIFEST_FILE,
  ManifestSchema,
  PackageJsonSchema,
  type PackageJson,
  parseAs,
  planPublish,
  sharedPackagesOf,
} from "./publish-plan.ts";

/** Runs a command, streaming its output; false (with an annotation) when it fails. */
const run = async (cwd: string, args: string[]): Promise<boolean> => {
  const { exitCode } = await $`${args}`.cwd(cwd).nothrow();
  if (exitCode !== 0) core.error(`\`${args.join(" ")}\` in ${cwd} exited with ${exitCode}`);
  return exitCode === 0;
};

/**
 * Installs without running any install script, the package's own `prepare`
 * included. Builds come only from `npm run build` and `npm publish`, and no
 * dependency's script runs in a job that can publish. Every tsdown component's
 * build output was checked to be identical with and without install scripts.
 */
const NPM_CI = ["npm", "ci", "--ignore-scripts", "--no-audit", "--no-fund"];

const readJson = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));

const main = async () => {
  const dryRun = process.argv.includes("--dry-run");
  const manifest = existsSync(MANIFEST_FILE)
    ? parseAs(ManifestSchema, readJson(MANIFEST_FILE), MANIFEST_FILE)
    : {};
  const packages: Record<string, PackageJson> = {};
  for (const key of Object.keys(manifest)) {
    const path = join("components", key, "package.json");
    if (existsSync(path)) packages[key] = parseAs(PackageJsonSchema, readJson(path), path);
  }
  // One registry round-trip for the whole manifest rather than one per
  // package. A lookup that fails fails the run before anything publishes.
  const published = Object.fromEntries(
    await Promise.all(
      Object.entries(manifest).map(async ([key, entry]) => [key, await fetchPublished(entry.name)] as const),
    ),
  );
  const versions = Object.fromEntries(Object.entries(packages).map(([key, pkg]) => [key, pkg.version]));

  const plan = planPublish(manifest, versions, published);
  const builtShared = new Map<string, Promise<boolean>>();
  const buildShared = (name: string): Promise<boolean> => {
    const cwd = join("packages", name);
    const pending =
      builtShared.get(name) ??
      (async () => (await run(cwd, NPM_CI)) && run(cwd, ["npm", "run", "build"]))();
    builtShared.set(name, pending);
    return pending;
  };
  const rows: string[][] = [];
  let failures = 0;

  for (const step of plan) {
    const label = `${step.entry.name}@${step.entry.version}`;
    if (step.action !== "publish") {
      if (step.action === "error") {
        core.error(`${label}: ${step.reason}`);
        failures++;
      }
      if (step.action === "manual") core.warning(`${label}: ${step.reason}`);
      rows.push([step.entry.name, step.entry.version, `${step.action}: ${step.reason}`]);
      continue;
    }

    const ok = await core.group(label, async () => {
      const dir = join("components", step.key);
      for (const shared of sharedPackagesOf(packages[step.key] ?? {})) {
        if (!(await buildShared(shared))) return false;
      }
      // `npm publish` runs `prepare`, which builds both outputs, so the
      // install skips scripts rather than building a second time.
      if (!(await run(dir, NPM_CI))) return false;
      const publish = ["npm", "publish", "--provenance", "--access", "public"];
      return run(dir, dryRun ? [...publish, "--dry-run"] : publish);
    });
    if (!ok) {
      core.error(`${label} failed to publish`);
      failures++;
    }
    rows.push([step.entry.name, step.entry.version, ok ? (dryRun ? "dry run" : "published") : "failed"]);
  }

  if (process.env["GITHUB_STEP_SUMMARY"]) {
    await core.summary
      .addTable([
        [
          { data: "Package", header: true },
          { data: "Version", header: true },
          { data: "Result", header: true },
        ],
        ...rows.map((row) => row.map((cell) => Bun.escapeHTML(cell))),
      ])
      .write();
  }
  if (failures > 0) core.setFailed(`${failures} package(s) could not be published`);
};

await main().catch((err: unknown) => core.setFailed(err instanceof Error ? err.message : String(err)));
