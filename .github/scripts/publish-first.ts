/**
 * Creates npm-ready components' packages on npm and hands them to
 * .github/workflows/npm-publish.yml, which publishes every real version.
 * `--all` takes every component in npm-api/manifest.json that npm has never
 * seen, or has only the bootstrap version of.
 *
 * npm can trust the workflow only with a package that already exists, and the
 * trust expires unless the workflow publishes within two days. So, from main
 * and the developer's npm login, this publishes each package at the bootstrap
 * version (0.0.1, the package as main builds it), makes the workflow its
 * trusted publisher, and then starts the workflow, which publishes the
 * manifest's version through it. Every package is built and packed before
 * anything publishes, then the publishes and trusted publishers run back to
 * back, so npm's one-time password prompts come together. A package that
 * fails does not stop the others, and running the command again for it picks
 * up where it stopped, replacing a trusted publisher that may have expired.
 *
 * Usage: mise run publish-first (<component>... | --all) [--dry-run]
 */

import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { $ } from "bun";
import semver from "semver";
import {
  BOOTSTRAP_VERSION,
  fetchPublished,
  type FirstPublish,
  MANIFEST_FILE,
  ManifestSchema,
  NPM_CI_ARGS,
  type PackageJson,
  PackageJsonSchema,
  parseAs,
  planFirstPublish,
  REGISTRY,
  sharedPackagesOf,
  trustConfigsIn,
} from "./publish-plan.ts";

/** `npm trust` needs npm 11.15 or later. */
const MINIMUM_NPM = "11.15.0";
const REPOSITORY = "prismatic-io/components";
const WORKFLOW = "npm-publish.yml";
/** The registry every npm command uses, so it publishes where the plan looked. */
const ON_REGISTRY = ["--registry", REGISTRY];

/** Runs npm attached to the terminal, so it can prompt for a login or a one-time password. */
const npm = async (cwd: string, args: string[]): Promise<void> => {
  const proc = Bun.spawn(["npm", ...args], { cwd, stdio: ["inherit", "inherit", "inherit"] });
  const code = await proc.exited;
  if (code !== 0) throw new Error(`\`npm ${args.join(" ")}\` in ${cwd} exited with ${code}`);
};

/** Like {@link npm}, returning what it prints, or null when it fails. */
const npmOutput = async (args: string[]): Promise<string | null> => {
  const proc = Bun.spawn(["npm", ...args], { stdio: ["inherit", "pipe", "inherit"] });
  const output = await new Response(proc.stdout).text();
  return (await proc.exited) === 0 ? output : null;
};

const readJson = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));

/** Why this checkout is not main as it is on GitHub, or null when it is. */
const checkoutProblem = async (): Promise<string | null> => {
  const branch = (await $`git rev-parse --abbrev-ref HEAD`.text()).trim();
  if (branch !== "main") return `this is ${branch}; check out main`;
  await $`git fetch --quiet origin main`;
  const [head, upstream] = await Promise.all([
    $`git rev-parse HEAD`.text(),
    $`git rev-parse origin/main`.text(),
  ]);
  if (head !== upstream) return "main is not origin/main; pull first";
  if ((await $`git status --porcelain --untracked-files=no`.text()).trim()) {
    return "there are local changes; commit or stash them";
  }
  return null;
};

/** A package this run creates or trusts, and how far it got. */
interface Job {
  key: string;
  step: Extract<FirstPublish, { action: "bootstrap" | "trust" }>;
  /** The packed package, at the bootstrap version. */
  bootstrap?: string;
  result?: string;
  failed?: boolean;
}

const errorText = (err: unknown): string => (err instanceof Error ? err.message : String(err));

/** Runs `work` for each job still going, recording a failure and moving on. */
const eachJob = async (jobs: Job[], work: (job: Job, label: string) => Promise<void>) => {
  for (const job of jobs) {
    if (job.failed) continue;
    try {
      await work(job, job.step.entry.name);
    } catch (err) {
      job.failed = true;
      job.result = `failed, ${errorText(err)}`;
    }
  }
};

/** Revokes every trusted publisher `name` has, returning how many it had. */
const replaceTrust = async (name: string, dryRun: boolean): Promise<number> => {
  const listed = await npmOutput(["trust", "list", name, "--json", ...ON_REGISTRY]);
  if (listed === null) throw new Error(`\`npm trust list ${name}\` failed`);
  const configs = trustConfigsIn(listed);
  for (const { id } of configs) {
    const revoke = ["trust", "revoke", name, "--id", id, ...ON_REGISTRY];
    await npm(".", dryRun ? [...revoke, "--dry-run"] : revoke);
  }
  return configs.length;
};

/** Packs a component as main builds it and unpacks it at the bootstrap version, ready to publish. */
const packBootstrap = async (key: string, into: string): Promise<string> => {
  const dir = join("components", key);
  // `npm pack` runs `prepare`, which builds both outputs; the unpacked copy is
  // published with scripts off, so nothing builds twice.
  await npm(dir, NPM_CI_ARGS);
  await npm(dir, ["pack", "--pack-destination", into]);
  const tarball = readdirSync(into).find((file) => file.endsWith(".tgz"));
  if (!tarball) throw new Error(`npm pack left no tarball in ${into}`);
  await $`tar -xzf ${join(into, tarball)} -C ${into}`;
  const unpacked = join(into, "package");
  const pkgPath = join(unpacked, "package.json");
  const pkg = readJson(pkgPath) as Record<string, unknown>;
  writeFileSync(pkgPath, `${JSON.stringify({ ...pkg, version: BOOTSTRAP_VERSION }, null, 2)}\n`);
  return unpacked;
};

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const all = args.includes("--all");
  const named = [...new Set(args.filter((arg) => !arg.startsWith("--")))];
  if (all === (named.length > 0)) {
    throw new Error("Usage: mise run publish-first (<component>... | --all) [--dry-run]");
  }
  process.chdir((await $`git rev-parse --show-toplevel`.text()).trim());
  const npmVersion = (await $`npm --version`.text()).trim();
  if (!semver.gte(npmVersion, MINIMUM_NPM)) {
    throw new Error(`npm ${npmVersion} is too old; run \`npm install --global npm@^${MINIMUM_NPM}\``);
  }

  const checkout = await checkoutProblem();
  if (checkout && !dryRun) throw new Error(checkout);
  if (checkout) console.warn(`Warning: ${checkout}. Continuing because this is a dry run.`);

  const manifest = existsSync(MANIFEST_FILE)
    ? parseAs(ManifestSchema, readJson(MANIFEST_FILE), MANIFEST_FILE)
    : {};
  const keys = all ? Object.keys(manifest).sort() : named;
  const packages: Record<string, PackageJson | undefined> = {};
  for (const key of keys) {
    const path = join("components", key, "package.json");
    packages[key] = existsSync(path) ? parseAs(PackageJsonSchema, readJson(path), path) : undefined;
  }
  const steps = await Promise.all(
    keys.map(async (key) => {
      const entry = manifest[key];
      const published = entry ? await fetchPublished(entry.name) : null;
      return [key, planFirstPublish(key, entry, packages[key]?.version, published)] as const;
    }),
  );

  // Every package is checked before anything publishes, so a typo or a
  // mismatched version stops the run rather than half of it.
  const problems = steps.flatMap(([key, step]) => (step.action === "error" ? [`${key}: ${step.reason}`] : []));
  if (problems.length > 0) throw new Error(`nothing was published:\n  ${problems.join("\n  ")}`);
  const jobs: Job[] = [];
  for (const [key, step] of steps) {
    if (step.action === "bootstrap" || step.action === "trust") jobs.push({ key, step });
    else if (step.action === "skip" && !all) console.log(`${key}: nothing to do; ${step.reason}`);
  }
  if (jobs.length === 0) {
    console.log("Every package is on npm already; the publish workflow publishes their versions.");
    return;
  }

  console.log("Checking your npm and GitHub logins");
  const loggedIn = await npm(".", ["whoami", ...ON_REGISTRY]).then(
    () => true,
    () => false,
  );
  if (!loggedIn && !dryRun) throw new Error(`not logged in to ${REGISTRY}; run \`npm login\` and try again`);
  if (!loggedIn) console.warn(`Warning: not logged in to ${REGISTRY}. Continuing because this is a dry run.`);
  const gh = (await $`gh auth status`.quiet().nothrow()).exitCode === 0;
  if (!gh && !dryRun) throw new Error("not logged in to GitHub, which starts the publish workflow; run `gh auth login`");
  if (!gh) console.warn("Warning: not logged in to GitHub. Continuing because this is a dry run.");

  const toBootstrap = jobs.filter((job) => job.step.action === "bootstrap");
  console.log(`\nBuilding ${toBootstrap.length} package(s)`);
  const builtShared = new Set<string>();
  const packDir = mkdtempSync(join(tmpdir(), "publish-first-"));
  await eachJob(toBootstrap, async (job, label) => {
    console.log(`\n== ${label}`);
    for (const shared of sharedPackagesOf(packages[job.key] ?? {})) {
      if (builtShared.has(shared)) continue;
      await npm(join("packages", shared), NPM_CI_ARGS);
      await npm(join("packages", shared), ["run", "build"]);
      builtShared.add(shared);
    }
    job.bootstrap = await packBootstrap(job.key, mkdtempSync(join(packDir, `${job.key}-`)));
  });

  console.log(`\nPublishing ${toBootstrap.filter((job) => !job.failed).length} package(s) at ${BOOTSTRAP_VERSION}`);
  await eachJob(toBootstrap, async (job, label) => {
    console.log(`\n== ${label}@${BOOTSTRAP_VERSION}`);
    const publish = ["publish", job.bootstrap ?? "", "--access", "public", "--ignore-scripts", ...ON_REGISTRY];
    await npm(".", dryRun ? [...publish, "--dry-run"] : publish);
  });

  console.log("\nSetting up trusted publishers");
  await eachJob(jobs, async (job, label) => {
    const trust = [
      ...["trust", "github", job.step.entry.name],
      ...["--repo", REPOSITORY, "--file", WORKFLOW, "--allow-publish", "--yes", ...ON_REGISTRY],
    ];
    if (dryRun && job.step.action === "bootstrap") {
      job.result = `dry run; would publish ${BOOTSTRAP_VERSION}, then run \`npm ${trust.join(" ")}\``;
      return;
    }
    console.log(`\n== ${label}`);
    // npm has only the bootstrap version, so the workflow has never published
    // through whatever trust a stopped run left. npm cannot say whether that
    // trust has expired, and allows one per package, so it is replaced, which
    // also restarts the two days.
    const replaced = await replaceTrust(job.step.entry.name, dryRun);
    await npm(".", dryRun ? [...trust, "--dry-run"] : trust);
    job.result = dryRun
      ? replaced > 0
        ? `dry run; would revoke ${replaced} trusted publisher(s) and set it again`
        : "dry run"
      : job.step.action === "bootstrap"
        ? `published ${BOOTSTRAP_VERSION}, trusted publisher set`
        : replaced > 0
          ? "trusted publisher replaced"
          : "trusted publisher set";
  });

  console.log("");
  for (const job of jobs) console.log(`${job.step.entry.name}: ${job.result}`);
  const trusted = jobs.filter((job) => !job.failed);
  if (trusted.length > 0) {
    // The trusted publishers expire unless the workflow publishes within two days.
    const dispatch = ["workflow", "run", WORKFLOW, "--repo", REPOSITORY, "--ref", "main", "-f", "dry_run=false"];
    if (dryRun) {
      console.log(`\nDry run: would then run \`gh ${dispatch.join(" ")}\``);
    } else {
      await $`gh ${dispatch}`;
      console.log(
        `\nStarted ${WORKFLOW}, which publishes ${trusted.length} package(s) at their manifest versions. ` +
          `Check it at https://github.com/${REPOSITORY}/actions/workflows/${WORKFLOW}; ` +
          "if it fails, fix it and run it again within two days, before the trusted publishers expire; " +
          "after that, run this command again for those packages first, which sets their trusted publishers up again.",
      );
    }
  }
  const failures = jobs.filter((job) => job.failed);
  if (failures.length > 0) {
    const rerun = failures.map((job) => job.key).join(" ");
    throw new Error(
      `${failures.length} package(s) failed; to pick up where they stopped, run\n  mise run publish-first ${rerun}`,
    );
  }
};

await main().catch((err: unknown) => {
  console.error(`publish-first: ${errorText(err)}`);
  process.exit(1);
});
