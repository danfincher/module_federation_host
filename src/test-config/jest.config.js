// eslint-disable-next-line @typescript-eslint/no-var-requires
const { jestModuleNameMappings } = require("@microsoft/azureportal-reactview/jestModuleNameMappings");

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/*.d.ts",
        "!**/*.resjson.ts",
        "!**/node_modules/**",
        "!test-config/**",
    ],
    coveragePathIgnorePatterns: [
        ".test.tsx",
        ".test.ts",
        "globalTestSetup.ts",
    ],
    coverageProvider: "babel",
    coverageReporters: [
        "text",
        "lcov",
    ],
    moduleNameMapper: {
        ...jestModuleNameMappings,
    },
    preset: "ts-jest",
    reporters: [
        "default",
        "jest-junit",
    ],
    rootDir: "../",
    setupFiles: [
        "<rootDir>/test-config/globalTestSetup.ts",
    ],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/**/__tests__/**/*.(spec|test).[jt]s?(x)",
        "<rootDir>/*.(spec|test).[tj]s?(x)",
        "<rootDir>/**/*.(spec|test).[tj]s?(x)",
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.test.json",
            },
        ],
    },
};
