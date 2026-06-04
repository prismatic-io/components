module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!ms-utils)"],
  moduleNameMapper: {
    "^ms-utils$": "<rootDir>/../../packages/ms-utils/src/index.ts",
  },
};
