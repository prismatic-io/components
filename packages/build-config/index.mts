import { createRequire } from "node:module";

/**
 * Packages that the platform bundle must always load through their CommonJS
 * entry, with the reason for each one.
 *
 * Rolldown gives a module with no `import`, `export` or `module.exports` the
 * format of the first importer that it scans: ESM for `import`, CommonJS for
 * `require`. Rolldown scans modules in parallel, so the first importer can
 * change between builds. When a package has such a module and the bundle
 * reaches it through both `import` and `require`, the bundle bytes change
 * between builds of the same source. Then the component signature changes and
 * the platform gets a new version with no change.
 *
 * To fix a new package with this problem, add its name to this list.
 */
export const CJS_ENTRY_PACKAGES: readonly string[] = [
  // index.js has no exports syntax. The ESM and CommonJS wrappers both load it.
  "safe-stable-stringify",
];

/**
 * A tsdown plugin that resolves each package in `packages` with `require`
 * semantics, starting from the importing file. Each importer gets the CommonJS
 * entry of its own copy, so a nested copy at a different version stays in use.
 */
export const cjsEntry = (packages: readonly string[] = CJS_ENTRY_PACKAGES) => {
  const names = new Set(packages);
  return {
    name: "cjs-entry",
    resolveId(source: string, importer?: string) {
      if (!importer || !names.has(source)) return null;
      return createRequire(importer).resolve(source);
    },
  };
};
