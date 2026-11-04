import { defineConfig } from "tsdown";

const sharedPackages = ["aws-utils"];

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
  },
  {
    entry: { index: "npm-dist/.entry.ts" },
    format: "cjs",
    outDir: "npm-dist",
    platform: "node",
    target: "node22",
    clean: true,
    dts: {
      resolver: "tsc",
      resolve: sharedPackages,
      compilerOptions: {
        paths: {
          "@prismatic-io/spectral": ["./node_modules/@prismatic-io/spectral"],
          "@prismatic-io/spectral/*": [
            "./node_modules/@prismatic-io/spectral/*",
          ],
        },
      },
    },
    deps: { alwaysBundle: sharedPackages },
    fixedExtension: true,
    loader: { ".md": "text" },
    copy: [{ from: "assets/**/*", to: "npm-dist", flatten: false }],
    hooks: {
      "build:before": async () => {
        const { mkdir, writeFile } = await import("node:fs/promises");
        await mkdir("npm-dist", { recursive: true });
        await writeFile(
          "npm-dist/.entry.ts",
          [
            'import { callableComponent } from "@prismatic-io/spectral";',
            'import component from "../src/index";',
            "export default callableComponent(component);",
            "",
          ].join("\n"),
        );
      },
      "build:done": async ({ options }) => {
        const { rm } = await import("node:fs/promises");
        if (!options.watch) await rm("npm-dist/.entry.ts", { force: true });
      },
    },
  },
]);
