module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "airbnb-typescript",
    "prettier",
    "prettier/@typescript-eslint",

  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    project: './tsconfig.json',
  },
  env: {
    node: false,
    browser: true,
    jest: true,
  },
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        "cases": {
          "camelCase": true, // use for other files
          "pascalCase": true // use for components
        }
      }
    ],
    'unicorn/no-null': 'warn',// some third party code might rely on nulls
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "warn",
    "import/no-default-export": "off",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // allow props spreading
    "react/jsx-props-no-spreading": "off",
    //disable prop types validation
    "react/prop-types": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    // Use function hoisting to improve code readability
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
  },
}