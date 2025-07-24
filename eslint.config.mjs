import next from "next/eslint";

/** @type {import('eslint').Linter.Config} */
const config = {
  ...next,
  rules: {
    ...next.rules,
  },
};

export default config;
