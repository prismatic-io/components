import { createRequire } from "node:module";

export const CJS_ENTRY_PACKAGES: readonly string[] = [
  "safe-stable-stringify",
  "firebase-admin/app",
  "firebase-admin/firestore",
];

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
