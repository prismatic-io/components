const esbuild = require("esbuild");
const fs = require("fs-extra");
const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config();

async function build() {
  console.log("Building with esbuild...");

  await fs.ensureDir("dist");

  console.log("Copying assets...");
  await fs.copy("assets", "dist");

  const define = {};
  for (const k in process.env) {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)) {
      define[`process.env.${k}`] = JSON.stringify(process.env[k]);
    }
  }

  console.log("Bundling TypeScript files...");
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    outfile: "dist/index.js",
    minify: true,

    mainFields: ["main"],
    conditions: ["node"],

    packages: "bundle",

    sourcemap: false,

    logLevel: "info",

    define,
  });

  console.log("Build complete!");
}

build().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
