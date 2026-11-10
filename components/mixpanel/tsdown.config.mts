import { defineConfig } from "tsdown";
import { callableEntryHooks } from "@prismatic-io/spectral/tsdown";
import { cjsEntry } from "../../packages/build-config/index.mts";

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: "cjs",
    outDir: "dist",
    platform: "node",
    clean: true,
    dts: false,
    minify: true,
    deps: {
      alwaysBundle: () => true,
      onlyBundle: false,
    },
    outExtensions: () => ({ js: ".js" }),
    outputOptions: { exports: "named", codeSplitting: false },
    copy: [{ from: "assets/**/*", to: "dist", flatten: false }],
    plugins: [cjsEntry()],
  },
  {
    entry: { index: "npm-dist/.entry.ts" },
    format: "cjs",
    outDir: "npm-dist",
    platform: "node",
    target: "node22",
    clean: true,
    dts: { resolver: "tsc" },
    fixedExtension: true,
    loader: { ".md": "text" },
    copy: [{ from: "assets/**/*", to: "npm-dist", flatten: false }],
    hooks: callableEntryHooks(),
  },
]);
