// eslint-disable-next-line import/no-extraneous-dependencies
import { build } from "esbuild";
import { promises as fs } from "node:fs";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await build({
    entryPoints: ["./src/index.ts"],
    outdir: "./dist",
    target: ["node14"],
    platform: "node",
    bundle: true,
    minify: true,
    keepNames: true, 
    sourcemap: false,
  });
  await fs.copyFile("./assets/icon.png", "./dist/icon.png");
})();
