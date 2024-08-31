module.exports = {
  root: true, // Specifies that ESLint should stop looking for configuration files in parent directories
  parserOptions: {
    ecmaVersion: 2021, // Specifies the ECMAScript version to use
    sourceType: "module", // Specifies the source type for modules (e.g., 'script' or 'module')
    ecmaFeatures: {
      jsx: true, // Allows parsing JSX
    },
  },
  env: {
    browser: true, // Enables browser global variables and browser APIs
    es2021: true, // Enables all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
    node: true, // Enables Node.js global variables and Node.js scoping
  },
  extends: [
    "eslint:recommended", // Uses ESLint's recommended rules
    "plugin:react/recommended", // Uses the recommended rules from eslint-plugin-react
    "plugin:react-native/all", // Uses all the rules from eslint-plugin-react-native
  ],
  plugins: ["react", "react-native"], // Specifies ESLint plugins
  rules: {
    "react-native/no-color-literals": "off",
    "react-native/no-raw-text": "off",
    "react-native/no-inline-styles": "off",
    "no-case-declarations": "off",
    "react/prop-types": "off", // Disables prop-types validation
    "no-undef": "error", // Enforce checking for undefined variables
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
};
