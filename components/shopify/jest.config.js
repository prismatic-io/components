module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
    "\\.(gql|graphql)$": "<rootDir>/jest/graphqlTransform.js",
  },
};
