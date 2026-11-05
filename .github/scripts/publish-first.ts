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
 * trusted publisher, waits for npm to finish reviewing the new packages, and
 * then starts the workflow with `mise run release`, which publishes the
 * manifest's version through it. Every package is built and packed before
 * anything publishes, then the publishes and trusted publishers run back to
 * back, so npm's one-time password prompts come together. A package that
 * fails does not stop the others, and running the same command again picks up
 * where it stopped, replacing a trusted publisher that may have expired.
 *
 * Usage: mise run publish-first (<component>... | --all) [--dry-run]
 */

import { existsSync } from "node:fs";
import { mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
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
  needsNpmAuth,
  type PackageJson,
  PackageJsonSchema,
  parseAs,
  planFirstPublish,
  REGISTRY,
  sharedPackagesOf,
  trustConfigsIn,
  waitForPackages,
} from "./publish-plan.ts";

/** `npm trust` needs npm 11.15 or later. */
const MINIMUM_NPM = "11.15.0";
const REPOSITORY = "prismatic-io/components";
const WORKFLOW = "npm-publish.yml";
/** The registry every npm command uses, so it publishes where the plan looked. */
const ON_REGISTRY = ["--registry", REGISTRY];

/** npm wants the developer to authenticate, and they cannot or chose to stop. */
class NpmAuthError extends Error {}

/** Copies npm's error output to the terminal as it comes, and returns it. */
const passThrough = async (stream: ReadableStream<Uint8Array>): Promise<string> => {
  const decoder = new TextDecoder();
  let text = "";
  for await (const chunk of stream) {
    process.stderr.write(chunk);
    text += decoder.decode(chunk, { stream: true });
  }
  return text + decoder.decode();
};

/** Whether the developer is at a terminal npm can prompt them through. */
const atTerminal = (): boolean => Boolean(process.stdin.isTTY && process.stdout.isTTY);

/**
 * Runs npm in a pseudo-terminal, so it can ask for a one-time password while its
 * output is still read: it sees a terminal, its output is shown to the developer and
 * kept, and what they type reaches it. Returns the exit code and everything npm
 * printed, its errors included.
 */
const runInTerminal = async (cwd: string, args: string[]): Promise<{ code: number; output: string }> => {
  const decoder = new TextDecoder();
  let output = "";
  let closed!: () => void;
  const drained = new Promise<void>((resolve) => {
    closed = resolve;
  });
  const proc = Bun.spawn(["npm", ...args], {
    cwd,
    terminal: {
      cols: process.stdout.columns || 80,
      rows: process.stdout.rows || 24,
      data: (_terminal, data) => {
        process.stdout.write(data);
        output += decoder.decode(data, { stream: true });
      },
      exit: () => closed(),
    },
  });
  const forward = (chunk: Uint8Array) => proc.terminal?.write(chunk);
  process.stdin.on("data", forward);
  try {
    const code = await proc.exited;
    // Output can arrive after the process exits, until the terminal reaches its end.
    await Promise.race([drained, Bun.sleep(1_000)]);
    return { code, output: output + decoder.decode() };
  } finally {
    process.stdin.off("data", forward);
    process.stdin.pause();
    proc.terminal?.close();
  }
};

/**
 * Runs npm with the terminal as its input and output, and returns what it prints
 * when `capture` is set. npm asks for a one-time password itself, in the browser,
 * only when both are the terminal; otherwise it fails with EOTP and masks the
 * authentication URL, so there is nothing to answer. A captured command runs in a
 * pseudo-terminal for that reason, when the developer is at a terminal. A failure to
 * authenticate stops the run, since every package after this one would fail the
 * same way.
 */
const runNpm = async (cwd: string, args: string[], capture: boolean): Promise<string> => {
  const command = `npm ${args.join(" ")}`;
  let code: number;
  let output = "";
  let errors: string;
  if (capture && atTerminal()) {
    ({ code, output } = await runInTerminal(cwd, args));
    errors = output;
  } else {
    const proc = Bun.spawn(["npm", ...args], {
      cwd,
      stdin: "inherit",
      stdout: capture ? "pipe" : "inherit",
      stderr: "pipe",
    });
    [output, errors] = await Promise.all([
      proc.stdout instanceof ReadableStream ? new Response(proc.stdout).text() : "",
      passThrough(proc.stderr),
    ]);
    code = await proc.exited;
  }
  if (code === 0) return output;
  if (needsNpmAuth(errors)) {
    throw new NpmAuthError(
      atTerminal()
        ? `\`${command}\` was not authenticated; run \`npm login\` if npm asked for a login`
        : `\`${command}\` needs a one-time password, and npm can only ask for one at a terminal; ` +
            "run `mise run publish-first` straight from a terminal, without piping its output",
    );
  }
  throw new Error(`\`${command}\` in ${cwd} exited with ${code}`);
};

const npm = async (cwd: string, args: string[]): Promise<void> => {
  await runNpm(cwd, args, false);
};

/** Like {@link npm}, returning what it prints. */
const npmOutput = (args: string[]): Promise<string> => runNpm(".", args, true);

const readJson = async (path: string): Promise<unknown> => JSON.parse(await readFile(path, "utf8"));

/**
 * Why this checkout is not main as it is on GitHub, or null when it is. Untracked files
 * count, since a pack could pick them up; ignored ones, such as node_modules and the
 * builds, do not, since the pack installs and rebuilds them.
 */
const checkoutProblem = async (): Promise<string | null> => {
  const branch = (await $`git rev-parse --abbrev-ref HEAD`.text()).trim();
  if (branch !== "main") return `this is ${branch}; check out main`;
  await $`git fetch --quiet origin main`;
  const [head, upstream] = await Promise.all([
    $`git rev-parse HEAD`.text(),
    $`git rev-parse origin/main`.text(),
  ]);
  if (head !== upstream) return "main is not origin/main; pull first";
  if ((await $`git status --porcelain`.text()).trim()) {
    return "there are local changes or untracked files; commit, stash or remove them";
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

/**
 * Runs `work` for each job still going, recording a failure and moving on. An npm
 * authentication that did not happen stops the run, since it would fail every job
 * after it too.
 */
const eachJob = async (jobs: Job[], work: (job: Job, label: string) => Promise<void>) => {
  for (const job of jobs) {
    if (job.failed) continue;
    try {
      await work(job, job.step.entry.name);
    } catch (err) {
      if (err instanceof NpmAuthError) throw err;
      job.failed = true;
      job.result = `failed, ${errorText(err)}`;
    }
  }
};

/** Revokes every trusted publisher `name` has, returning how many it had. */
const replaceTrust = async (name: string, dryRun: boolean): Promise<number> => {
  const listed = await npmOutput(["trust", "list", name, "--json", ...ON_REGISTRY]);
  const configs = trustConfigsIn(listed);
  for (const { id } of configs) {
    const revoke = ["trust", "revoke", name, "--id", id, ...ON_REGISTRY];
    await npm(".", dryRun ? [...revoke, "--dry-run"] : revoke);
  }
  return configs.length;
};

/**
 * Packs a component as main builds it and unpacks it at the bootstrap version, ready
 * to publish. When `restore` is set, the component's tracked files are put back
 * afterwards, since its build formats and lints its source in place.
 */
const packBootstrap = async (key: string, into: string, restore: boolean): Promise<string> => {
  const dir = join("components", key);
  // `npm pack` runs `prepare`, which builds both outputs; the unpacked copy is
  // published with scripts off, so nothing builds twice.
  await npm(dir, NPM_CI_ARGS);
  try {
    await npm(dir, ["pack", "--pack-destination", into]);
  } finally {
    if (restore) await $`git checkout -- ${dir}`.quiet();
  }
  const tarball = (await readdir(into)).find((file) => file.endsWith(".tgz"));
  if (!tarball) throw new Error(`npm pack left no tarball in ${into}`);
  await $`tar -xzf ${join(into, tarball)} -C ${into}`;
  const unpacked = join(into, "package");
  const pkgPath = join(unpacked, "package.json");
  const pkg = (await readJson(pkgPath)) as Record<string, unknown>;
  await writeFile(pkgPath, `${JSON.stringify({ ...pkg, version: BOOTSTRAP_VERSION }, null, 2)}\n`);
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

  // A build formats its component's source in place; a tree that starts clean is put
  // back after each pack, so no change of the developer's is lost.
  const clean = !(await $`git status --porcelain`.text()).trim();
  const checkout = await checkoutProblem();
  if (checkout && !dryRun) throw new Error(checkout);
  if (checkout) console.warn(`Warning: ${checkout}. Continuing because this is a dry run.`);

  const manifest = existsSync(MANIFEST_FILE)
    ? parseAs(ManifestSchema, await readJson(MANIFEST_FILE), MANIFEST_FILE)
    : {};
  const keys = all ? Object.keys(manifest).sort() : named;
  const packages: Record<string, PackageJson | undefined> = {};
  for (const key of keys) {
    const path = join("components", key, "package.json");
    packages[key] = existsSync(path) ? parseAs(PackageJsonSchema, await readJson(path), path) : undefined;
  }
  const steps = await Promise.all(
    keys.map(async (key) => {
      const entry = manifest[key];
      const published = entry ? await fetchPublished(entry.name) : null;
      return [key, planFirstPublish(key, entry, packages[key], published)] as const;
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
  const packDir = await mkdtemp(join(tmpdir(), "publish-first-"));
  await eachJob(toBootstrap, async (job, label) => {
    console.log(`\n== ${label}`);
    for (const shared of sharedPackagesOf(packages[job.key] ?? {})) {
      if (builtShared.has(shared)) continue;
      await npm(join("packages", shared), NPM_CI_ARGS);
      await npm(join("packages", shared), ["run", "build"]);
      builtShared.add(shared);
    }
    job.bootstrap = await packBootstrap(job.key, await mkdtemp(join(packDir, `${job.key}-`)), clean);
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
    const command = dryRun ? [...trust, "--dry-run"] : trust;
    let replaced = 0;
    try {
      await npm(".", command);
    } catch (err) {
      // npm allows one trusted publisher per package. npm has only the bootstrap
      // version, so the workflow has never published through one a stopped run
      // left, and npm cannot say whether it has expired; it is replaced, which
      // also restarts the two days. Listing comes only after a set that failed,
      // rather than before every one.
      if (err instanceof NpmAuthError || job.step.action !== "trust") throw err;
      replaced = await replaceTrust(job.step.entry.name, dryRun);
      if (replaced === 0) throw err;
      await npm(".", command);
    }
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
  // The workflow skips a package the registry does not show yet, and npm holds
  // a new package's first version back while it reviews it.
  const created = trusted.filter((job) => job.step.action === "bootstrap").map((job) => job.step.entry.name);
  let inReview: string[] = [];
  if (created.length > 0 && !dryRun) {
    console.log(`\nWaiting for npm to finish reviewing ${created.length} new package(s), for up to 15 minutes`);
    let reported = created.length;
    let waits = 0;
    inReview = await waitForPackages(created, {
      onWait: (pending) => {
        waits++;
        // The lookups run every 15 seconds; a line each minute shows the wait is alive.
        if (pending.length !== reported || waits % 4 === 0) {
          console.log(`  ${pending.length} still in review after ${Math.round(waits / 4)} minute(s)`);
        }
        reported = pending.length;
      },
    });
  }
  const ready = trusted.filter((job) => !inReview.includes(job.step.entry.name));
  if (ready.length > 0) {
    // The trusted publishers expire unless the workflow publishes within two days.
    if (dryRun) {
      const wait = created.length > 0 ? `wait for npm to show ${created.length} new package(s), then ` : "";
      console.log(`\nDry run: would ${wait}run \`mise run release\``);
    } else {
      await $`mise run release`;
      console.log(
        `\nThe workflow publishes ${ready.length} package(s) at their manifest versions. ` +
          `Check it at https://github.com/${REPOSITORY}/actions/workflows/${WORKFLOW}; ` +
          "if it fails, fix it and run it again within two days, before the trusted publishers expire; " +
          "after that, run this command again for those packages first, which sets their trusted publishers up again.",
      );
    }
  }
  if (inReview.length > 0) {
    console.log(
      `\nnpm is still reviewing ${inReview.length} package(s): ${inReview.join(", ")}. ` +
        "Once npm shows them, run `mise run release` within two days, before their trusted publishers expire; " +
        "after that, run this command again for them first.",
    );
  }
  const failures = jobs.filter((job) => job.failed);
  if (failures.length > 0) {
    // A rerun skips what is done, so the same command picks up where this one stopped.
    const rerun = all ? "--all" : named.join(" ");
    throw new Error(
      `${failures.length} package(s) failed (${failures.map((job) => job.key).join(", ")}); ` +
        `fix them and run \`mise run publish-first ${rerun}\` again`,
    );
  }
};

await main().catch((err: unknown) => {
  console.error(`publish-first: ${errorText(err)}`);
  process.exit(1);
});
