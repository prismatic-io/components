module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!(ms-utils)/)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
          esModuleInterop: true,
          moduleResolution: "node",
        },
      },
    ],
    "^.+\\.js$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
          esModuleInterop: true,
          moduleResolution: "node",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^ms-utils$": "<rootDir>/../../packages/ms-utils/src/index.ts",
  },
};
