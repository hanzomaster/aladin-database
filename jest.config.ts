import nextJest from "next/jest";

const withNextJest = nextJest({
  dir: "./",
});
// eslint-disable-next-line import/no-anonymous-default-export
export default withNextJest({
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],

  testEnvironment: "jest-environment-jsdom",

  /**
   * Absolute imports and Module Path Aliases
   */
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/public/$1",
  },
  testPathIgnorePatterns: ["helpers"],
});
