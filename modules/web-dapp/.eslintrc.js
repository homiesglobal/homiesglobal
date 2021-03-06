module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb/base",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    "func-names": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "react/prop-types": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  env: {
    node: true,
    commonjs: true,
    jest: true,
    browser: true,
  },
  settings: {
    indent: ["error", 2],
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    react: {
      version: "17.0",
    },
  },
};
