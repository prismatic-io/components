# Releasing npm packages

This page is for Prismatic maintainers.

Each component listed in `npm-api/manifest.json` is published to npm as
`@prismatic-io/components-<key>`. The manifest records the version of each package. The
"Publish npm packages" workflow (`.github/workflows/npm-publish.yml`) starts when a commit on
`main` changes the manifest, and publishes each manifest version that npm does not have yet.

The workflow publishes through npm trusted publishing, so it has no npm token. npm lets a
workflow publish only a package that already exists. Thus a package that is new to npm needs one
first publish by a maintainer. After that, every version is published by the workflow.

## Publish a new package

Do this when a package is in `npm-api/manifest.json` on `main` but not on npm. The workflow
shows a warning for each of these packages.

You need:

- a clean, up-to-date clone of this repository on `main`;
- [mise](https://mise.jdx.dev/), which installs the tools in `mise.toml` (npm 11.15 or later);
- `npm login`, with publish rights on the `@prismatic-io` scope;
- `gh auth login`, with access to this repository.

Run, in a terminal (not piped):

```bash
git switch main && git pull
mise run publish-first <key>... --dry-run   # check the plan
mise run publish-first <key>...
```

Use `--all` in place of the keys to take every package in the manifest that npm does not have,
or has only at `0.0.1`.

For each package, the command:

1. publishes version `0.0.1`, built from `main`;
2. makes `npm-publish.yml` the package's trusted publisher (approve the npm sign-in in the
   browser, and accept the offer to skip one-time passwords);
3. waits up to 15 minutes until npm shows the new packages;
4. starts the workflow (`mise run release`), which publishes the manifest's version.

When that workflow run is green, `npm view @prismatic-io/components-<key>` shows the package.

npm removes a trusted publisher that has not published within two days. If the workflow does
not publish in that time, run `mise run publish-first <key>` again.

## Later versions

Nothing is necessary. A commit that changes a package's version in the manifest starts the
workflow, and the workflow publishes that version. The version goes up by a minor version when
the package's types or its spectral range change, and by a patch version when only its build
changes.

To see what the workflow would publish, run `mise run release --dry-run`. To publish again after
a failed run, run `mise run release`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `publish-first` does not start | Switch to `main`, `git pull`, and commit or remove local changes |
| `publish-first` stops with an npm sign-in message | Run it again directly in a terminal (not piped), or run `npm login` if your session expired. It continues from where it stopped |
| A package is still in npm's review when `publish-first` finishes | Wait until `npm view` shows it, then run `mise run release` within two days |
| The workflow says that npm does not recognize it as the package's trusted publisher | Run `mise run publish-first <key>` again. It replaces an expired trusted publisher |
| npm shows a `0.0.0-stage` version | This is npm's placeholder for a new package. Ignore it |
| A package fails in `publish-first` and the others continue | Fix the cause, then run the same command again. Packages that are already on npm are skipped |
