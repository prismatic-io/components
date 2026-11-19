import { defineConfig, type Rolldown } from "tsdown";
import { callableEntryHooks } from "@prismatic-io/spectral/tsdown";

const NATIVE_STUB = "\0sftp-native-stub";

const ssh2NativeStub = (): Rolldown.Plugin => ({
  name: "sftp-ssh2-native-stub",
  resolveId(source) {
    if (source === "cpu-features" || source.endsWith("sshcrypto.node"))
      return NATIVE_STUB;
    return null;
  },
  load(id) {
    if (id !== NATIVE_STUB) return null;
    return 'module.exports = (() => { throw new Error("Not available in this bundle"); })();';
  },
});

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
      neverBundle: ["cpu-features", /sshcrypto\.node$/],
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
    dts: { resolver: "tsc" },
    fixedExtension: true,
    deps: { alwaysBundle: ["ssh2-sftp-client"] },
    plugins: [ssh2NativeStub()],
    loader: { ".md": "text" },
    copy: [{ from: "assets/**/*", to: "npm-dist", flatten: false }],
    hooks: callableEntryHooks(),
  },
]);
