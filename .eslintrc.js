module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "promise"
    ],
    "rules": {
        "no-console": "off",
        "react/react-in-jsx-scope": "off", // suppress errors for missing 'import React' in files
        "react/prop-types": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
