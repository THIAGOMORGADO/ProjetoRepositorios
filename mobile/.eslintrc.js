module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: "babel-eslint",
  extends: ["plugin:react/recommended", "airbnb", "prettier", "prettier/react"],
  globals: {
    atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
    "import/prefere-default-export": "off",
  },
};
