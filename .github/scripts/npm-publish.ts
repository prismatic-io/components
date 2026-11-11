/**
 * Publishes the npm packages of npm-ready components.
 *
 * Versions are recorded in npm-api/manifest.json. This publishes what the
 * manifest lists and npm does not have yet, so reruns and commits that bump
 * nothing are no-ops.
 *
 * A package npm has never seen is not published here. A developer creates it
 * with `mise run publish-first <component>`, which publishes 0.0.1, points the
 * package's trusted publisher at this workflow, and starts it to publish the
 * manifest's version; every version after 0.0.1 is ours.
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
  NPM_CI_ARGS,
  NPM_OIDC_AUDIENCE,
  PackageJsonSchema,
  type PackageJson,
  parseAs,
  planPublish,
  readSharedPackage,
  sharedPackagesToBuild,
  trustProblem,
} from "./publish-plan.ts";

/** Runs a command, streaming its output; false (with an annotation) when it fails. */
const run = async (cwd: string, args: string[]): Promise<boolean> => {
  const { exitCode } = await $`${args}`.cwd(cwd).nothrow();
  if (exitCode !== 0) core.error(`\`${args.join(" ")}\` in ${cwd} exited with ${exitCode}`);
  return exitCode === 0;
};

const NPM_CI = ["npm", ...NPM_CI_ARGS];

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
  const plan = planPublish(manifest, packages, published);
  // Every package to publish is checked for a trusted publisher naming this
  // workflow before anything builds, so one without fails in seconds rather than
  // after its build. One allowed only to stage still fails at `npm publish`.
  const toPublish = plan.flatMap((step) => (step.action === "publish" ? [step.entry.name] : []));
  const idToken = toPublish.length > 0 ? await core.getIDToken(NPM_OIDC_AUDIENCE) : "";
  const untrusted = Object.fromEntries(
    await Promise.all(toPublish.map(async (name) => [name, await trustProblem(name, idToken)] as const)),
  );
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

    const problem = untrusted[step.entry.name];
    if (problem) {
      core.error(
        `${label}: npm does not recognize this workflow as its trusted publisher (${problem}); ` +
          `run \`mise run publish-first ${step.key}\` to set its trusted publisher`,
      );
      failures++;
      rows.push([step.entry.name, step.entry.version, `no trusted publisher for this workflow: ${problem}`]);
      continue;
    }

    const ok = await core.group(label, async () => {
      const dir = join("components", step.key);
      for (const shared of sharedPackagesToBuild(packages[step.key] ?? {}, readSharedPackage)) {
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
