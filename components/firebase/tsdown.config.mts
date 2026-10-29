import { createRequire } from "node:module";
import { defineConfig } from "tsdown";
const require = createRequire(import.meta.url);
export default defineConfig({
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
  copy: [{ from: "assets/*", to: "dist" }],
  inputOptions: {
    resolve: {
      alias: {
        "firebase-admin/app": require.resolve("firebase-admin/app"),
        "firebase-admin/firestore": require.resolve("firebase-admin/firestore"),
      },
    },
  },
});
