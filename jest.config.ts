require("ts-node/register");
require("dotenv").config({ path: ".env.test" });

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
