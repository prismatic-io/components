module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^atlassian-utils$": "<rootDir>/../../packages/atlassian-utils/src/index.ts",
  },
};
